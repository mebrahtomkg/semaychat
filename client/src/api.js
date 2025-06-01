'use strict';

export async function post(path, data = {}) {
  return makeRequest(path, data, 'POST');
}

export async function put(path, data = {}) {
  return makeRequest(path, data, 'PUT');
}

async function makeRequest(path, data, method) {
  let result;
  try {
    const response = await fetch(path, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await response.json();
  } catch (error) {
    result = { success: false, error: error.message || error.name };
  }
  return result;
}

export async function get(path) {
  let result;
  try {
    const response = await fetch(path);
    result = await response.json();
  } catch (error) {
    result = { success: false, error: error.message || error.name };
  }
  return result;
}

export async function Delete(path) {
  try {
    const response = await fetch(path, { method: 'DELETE' });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message || error.name };
  }
}
