const modal = document.getElementById('eventModal');

modal.addEventListener('show.bs.modal', (event) => {
    const card = event.relatedTarget;
    document.getElementById('modalTitle').textContent = card.dataset.title ?? '';
    document.getElementById('modalContent').textContent = card.dataset.body ?? '';
});
