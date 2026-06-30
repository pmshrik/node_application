const API_BASE = '/api/tasks';

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskCount = document.getElementById('task-count');

async function fetchTasks() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to load tasks');
  return response.json();
}

async function createTask(title, description) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to create task');
  }
  return response.json();
}

async function toggleTask(id) {
  const response = await fetch(`${API_BASE}/${id}/toggle`, { method: 'PATCH' });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

async function deleteTask(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete task');
}

function showError(message) {
  const toast = document.createElement('div');
  toast.className = 'error-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  taskCount.textContent = tasks.length ? `(${tasks.length})` : '';

  if (tasks.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  tasks.forEach((task) => {
    const card = document.createElement('div');
    card.className = `task-card${task.completed ? ' completed' : ''}`;
    card.innerHTML = `
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
      </div>
      <div class="task-actions">
        <button class="btn-toggle" data-id="${task.id}">${task.completed ? 'Undo' : 'Done'}</button>
        <button class="btn-delete" data-id="${task.id}">Delete</button>
      </div>
    `;
    taskList.appendChild(card);
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function loadTasks() {
  try {
    const tasks = await fetchTasks();
    renderTasks(tasks);
  } catch (error) {
    showError(error.message);
  }
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  try {
    await createTask(title, description);
    taskForm.reset();
    await loadTasks();
  } catch (error) {
    showError(error.message);
  }
});

taskList.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  try {
    if (e.target.classList.contains('btn-toggle')) {
      await toggleTask(id);
    } else if (e.target.classList.contains('btn-delete')) {
      await deleteTask(id);
    }
    await loadTasks();
  } catch (error) {
    showError(error.message);
  }
});

loadTasks();
