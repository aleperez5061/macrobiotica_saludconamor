// State management
let currentView = 'clientes';
let editItemId = null; // Stores ID if editing

// API Base URLs
const API_URLS = {
    clientes: '/api/clientes',
    categorias: '/api/categorias',
    productos: '/api/productos',
    sucursales: '/api/sucursales',
    roles: '/api/roles',
    empleados: '/api/empleados',
    preguntas: '/api/preguntas',
    encuestas: '/api/encuestas',
    feedback: '/api/feedback',
    bitacora: '/api/bitacora',
    reportes: '/api/reportes'
};

// Form specifications for dynamic modal rendering
const FORM_SPECS = {
    clientes: [
        { name: 'nombre', label: 'Nombre Completo', type: 'text', required: true },
        { name: 'tel', label: 'Teléfono', type: 'tel', required: true },
        { name: 'correo', label: 'Correo Electrónico', type: 'email', required: true }
    ],
    categorias: [
        { name: 'nombre_cat', label: 'Nombre de la Categoría', type: 'text', required: true }
    ],
    productos: [
        { name: 'nombre', label: 'Nombre del Producto', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true }
    ],
    sucursales: [
        { name: 'nombre', label: 'Nombre de Sucursal', type: 'text', required: true },
        { name: 'direccion', label: 'Dirección Completa', type: 'text', required: true }
    ],
    roles: [
        { name: 'rol', label: 'Nombre del Rol', type: 'text', required: true },
        { name: 'permisos', label: 'Permisos (separados por comas)', type: 'text', required: false, placeholder: 'leer, escribir, borrar' }
    ],
    empleados: [
        { name: 'nombre', label: 'Nombre del Empleado', type: 'text', required: true },
        { name: 'puesto', label: 'Puesto / Cargo', type: 'text', required: true }
    ],
    preguntas: [
        { name: 'texto', label: 'Texto de la Pregunta', type: 'text', required: true },
        { name: 'tipo', label: 'Tipo de Escala / Respuesta', type: 'select', options: ['escala_1_al_5', 'texto_libre'], required: true }
    ],
    encuestas: [
        { name: 'titulo', label: 'Título de la Encuesta', type: 'text', required: true },
        { name: 'estado', label: 'Estado', type: 'select', options: ['activa', 'inactiva'], default: 'activa', required: true }
    ],
    feedback: [
        { name: 'comentario', label: 'Comentario / Sugerencia', type: 'textarea', required: true }
    ]
};

// DOM Elements
const viewTitle = document.getElementById('view-title');
const viewDescription = document.getElementById('view-description');
const headerActions = document.getElementById('header-actions');
const btnAddNew = document.getElementById('btn-add-new');
const dynamicContainer = document.getElementById('dynamic-container');
const toastContainer = document.getElementById('toast-container');

// Modals
const genericModal = document.getElementById('generic-modal');
const modalTitle = document.getElementById('modal-title');
const formFieldsContainer = document.getElementById('form-fields-container');
const genericForm = document.getElementById('generic-form');

const surveyModal = document.getElementById('survey-modal');
const surveyForm = document.getElementById('survey-form');
const surveyIdInput = document.getElementById('survey-id-input');
const surveyQuestionsContainer = document.getElementById('survey-questions-container');

// View configurations (Subtitles & Descriptions)
const VIEW_INFOS = {
    clientes: { title: 'Clientes', desc: 'Gestiona la información de tus clientes y pacientes.', hasAdd: true },
    categorias: { title: 'Categorías', desc: 'Clasificación de productos de macrobiótica.', hasAdd: true },
    productos: { title: 'Productos', desc: 'Catálogo de suplementos naturales y productos saludables.', hasAdd: true },
    sucursales: { title: 'Sucursales', desc: 'Ubicaciones físicas y centros de atención.', hasAdd: true },
    roles: { title: 'Roles', desc: 'Niveles de acceso y permisos del sistema.', hasAdd: true },
    empleados: { title: 'Empleados', desc: 'Nómina de colaboradores de Salud con Amor.', hasAdd: true },
    preguntas: { title: 'Preguntas', desc: 'Banco de preguntas para encuestas de satisfacción.', hasAdd: true },
    encuestas: { title: 'Encuestas', desc: 'Lanza encuestas para obtener feedback de tus clientes.', hasAdd: true },
    feedback: { title: 'Feedback Directo', desc: 'Mensajes, quejas y sugerencias directas de clientes.', hasAdd: true },
    bitacora: { title: 'Bitácora de Auditoría', desc: 'Historial de acciones registradas en el sistema.', hasAdd: false },
    reportes: { title: 'Reportes y Estadísticas', desc: 'Analiza el nivel de satisfacción de las encuestas.', hasAdd: false }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    setupSidebar();
    setupModals();
    loadView(currentView);
});

// Sidebar Navigation Handling
function setupSidebar() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            currentView = item.getAttribute('data-view');
            loadView(currentView);
        });
    });
}

// Modal Toggle Setup
function setupModals() {
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('btn-modal-cancel');
    
    const closeSurveyBtn = document.getElementById('survey-modal-close');
    const cancelSurveyBtn = document.getElementById('btn-survey-cancel');

    const closeModal = () => {
        genericModal.classList.remove('active');
        editItemId = null;
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    const closeSurvey = () => surveyModal.classList.remove('active');
    closeSurveyBtn.addEventListener('click', closeSurvey);
    cancelSurveyBtn.addEventListener('click', closeSurvey);

    btnAddNew.addEventListener('click', () => {
        openAddModal();
    });

    genericForm.addEventListener('submit', handleFormSubmit);
    surveyForm.addEventListener('submit', handleSurveySubmit);
}

// Helper: Show Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '💚' : '⚠️'}</span> ${message}`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Helper: Audit Logger
async function logAudit(action) {
    try {
        await fetch(API_URLS.bitacora, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: 'Administrador UI',
                accion: action
            })
        });
    } catch (e) {
        console.error('No se pudo registrar la acción en la bitácora', e);
    }
}

// Main View Loader
async function loadView(view) {
    currentView = view;
    const info = VIEW_INFOS[view];
    
    // Header Setup
    viewTitle.textContent = info.title;
    viewDescription.textContent = info.desc;
    
    if (info.hasAdd) {
        btnAddNew.style.display = 'inline-flex';
    } else {
        btnAddNew.style.display = 'none';
    }

    dynamicContainer.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted);">Cargando información...</div>`;

    try {
        const fetchUrl = view === 'reportes' ? API_URLS.encuestas : API_URLS[view];
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error('Error al obtener datos');
        const data = await response.json();
        
        renderViewData(view, data);
    } catch (err) {
        showToast(err.message, 'error');
        dynamicContainer.innerHTML = `<div style="text-align: center; padding: 40px; color: #ef4444;">Error de carga: ${err.message}</div>`;
    }
}

// Render dynamic lists based on data type
function renderViewData(view, data) {
    if (!data || data.length === 0) {
        dynamicContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 40px; background: white; border-radius: var(--border-radius); border: 1px dashed var(--border-color);">
                <div style="font-size: 2.5rem; margin-bottom: 12px;">🌱</div>
                <h3 style="color: var(--text-main); margin-bottom: 8px;">No hay registros</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Comienza agregando un nuevo elemento en este módulo.</p>
                ${VIEW_INFOS[view].hasAdd ? `<button class="btn btn-primary" onclick="openAddModal()">+ Agregar Primer Registro</button>` : ''}
            </div>
        `;
        return;
    }

    let html = `<div class="table-container"><table class="data-table"><thead><tr>`;
    
    // Headers selection
    const headers = getHeadersForView(view);
    headers.forEach(h => html += `<th>${h.label}</th>`);
    
    // Action column header if editable/deletable/interactive
    if (view !== 'bitacora' && view !== 'reportes') {
        html += `<th>Acciones</th>`;
    } else if (view === 'reportes') {
        html += `<th>Estadísticas</th>`;
    }
    
    html += `</tr></thead><tbody>`;

    data.forEach(item => {
        html += `<tr>`;
        headers.forEach(h => {
            let val = item[h.key];
            if (h.key === 'fecha' || h.key === 'fecha_inicio' || h.key === 'fecha_respuesta') {
                val = new Date(val).toLocaleDateString() + ' ' + new Date(val).toLocaleTimeString();
            } else if (h.key === 'permisos' && Array.isArray(val)) {
                val = val.join(', ');
            } else if (h.key === 'estado') {
                const badgeClass = val === 'activa' ? 'badge-success' : 'badge-secondary';
                val = `<span class="badge ${badgeClass}">${val}</span>`;
            }
            html += `<td>${val !== undefined ? val : '-'}</td>`;
        });

        // Actions buttons cell
        if (view !== 'bitacora' && view !== 'reportes') {
            html += `<td>`;
            // Check if edit is supported (encuestas, feedback, etc. may have limited edit depending on controller)
            const editable = ['clientes', 'categorias', 'productos', 'sucursales', 'roles', 'empleados', 'preguntas'].includes(view);
            const deletable = ['categorias', 'productos', 'sucursales', 'roles', 'empleados', 'preguntas', 'feedback'].includes(view);
            
            if (editable) {
                html += `<button class="btn btn-secondary btn-sm" onclick="openEditModal('${item._id}')" style="margin-right: 6px;">✏️ Editar</button>`;
            }
            
            if (deletable) {
                html += `<button class="btn btn-danger btn-sm" onclick="deleteItem('${item._id}')">🗑️ Eliminar</button>`;
            }

            if (view === 'encuestas') {
                html += `<button class="btn btn-primary btn-sm" onclick="openSurveyResponseModal('${item._id}')" style="margin-right: 6px;">🗳️ Responder</button>`;
                html += `<button class="btn btn-secondary btn-sm" onclick="viewSurveyReport('${item._id}', '${item.titulo}')">📊 Reporte</button>`;
            }
            
            html += `</td>`;
        } else if (view === 'reportes') {
            // Report generator button based on active encuestas
            html += `<td>`;
            html += `<button class="btn btn-primary btn-sm" onclick="viewSurveyReport('${item._id}', '${item.titulo}')">📈 Generar Reporte de Satisfacción</button>`;
            html += `</td>`;
        }

        html += `</tr>`;
    });

    html += `</tbody></table></div>`;
    dynamicContainer.innerHTML = html;
}

// Get columns configuration based on active tab
function getHeadersForView(view) {
    switch(view) {
        case 'clientes':
            return [{ key: 'nombre', label: 'Nombre' }, { key: 'tel', label: 'Teléfono' }, { key: 'correo', label: 'Correo' }];
        case 'categorias':
            return [{ key: 'nombre_cat', label: 'Categoría' }];
        case 'productos':
            return [{ key: 'nombre', label: 'Nombre' }, { key: 'marca', label: 'Marca' }];
        case 'sucursales':
            return [{ key: 'nombre', label: 'Sucursal' }, { key: 'direccion', label: 'Dirección' }];
        case 'roles':
            return [{ key: 'rol', label: 'Rol' }, { key: 'permisos', label: 'Permisos' }];
        case 'empleados':
            return [{ key: 'nombre', label: 'Empleado' }, { key: 'puesto', label: 'Puesto' }];
        case 'preguntas':
            return [{ key: 'texto', label: 'Pregunta' }, { key: 'tipo', label: 'Tipo' }];
        case 'encuestas':
        case 'reportes':
            return [{ key: 'titulo', label: 'Encuesta' }, { key: 'estado', label: 'Estado' }, { key: 'fecha_inicio', label: 'Inició' }];
        case 'feedback':
            return [{ key: 'comentario', label: 'Comentario' }, { key: 'fecha', label: 'Fecha' }];
        case 'bitacora':
            return [{ key: 'usuario', label: 'Usuario' }, { key: 'accion', label: 'Acción' }, { key: 'hora', label: 'Hora' }];
        default:
            return [];
    }
}

// Dynamic Modals for Create and Edit
function openAddModal() {
    editItemId = null;
    modalTitle.textContent = `Agregar Nuevo ${VIEW_INFOS[currentView].title}`;
    renderFormFields();
    genericForm.reset();
    genericModal.classList.add('active');
}

async function openEditModal(id) {
    editItemId = id;
    modalTitle.textContent = `Editar ${VIEW_INFOS[currentView].title}`;
    renderFormFields();
    
    try {
        const response = await fetch(`${API_URLS[currentView]}/${id}`);
        if (!response.ok) throw new Error('No se pudo cargar el registro.');
        const data = await response.json();
        
        // Populate inputs
        const spec = FORM_SPECS[currentView];
        spec.forEach(field => {
            const input = document.getElementById(`field-${field.name}`);
            if (input) {
                if (field.name === 'permisos' && Array.isArray(data[field.name])) {
                    input.value = data[field.name].join(', ');
                } else {
                    input.value = data[field.name] || '';
                }
            }
        });
        
        genericModal.classList.add('active');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

function renderFormFields() {
    formFieldsContainer.innerHTML = '';
    const fields = FORM_SPECS[currentView];
    if (!fields) return;

    fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';
        
        const label = document.createElement('label');
        label.setAttribute('for', `field-${field.name}`);
        label.textContent = field.label;
        group.appendChild(label);
        
        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            field.options.forEach(opt => {
                const o = document.createElement('option');
                o.value = opt;
                o.textContent = opt;
                input.appendChild(o);
            });
        } else if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 4;
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
        
        input.className = 'form-control';
        input.id = `field-${field.name}`;
        input.name = field.name;
        if (field.required) input.required = true;
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.default) input.value = field.default;
        
        group.appendChild(input);
        formFieldsContainer.appendChild(group);
    });
}

// Handling CRUDS Submissions
async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(genericForm);
    const bodyObj = {};
    
    FORM_SPECS[currentView].forEach(field => {
        let val = formData.get(field.name);
        if (field.name === 'permisos') {
            val = val ? val.split(',').map(p => p.trim()).filter(Boolean) : [];
        }
        bodyObj[field.name] = val;
    });

    const isEdit = editItemId !== null;
    const url = isEdit ? `${API_URLS[currentView]}/${editItemId}` : API_URLS[currentView];
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyObj)
        });

        if (!response.ok) throw new Error('Error al guardar los cambios.');
        
        showToast(isEdit ? 'Registro actualizado con éxito.' : 'Registro agregado con éxito.');
        genericModal.classList.remove('active');
        
        // Log to Audit trail
        await logAudit(`${isEdit ? 'Actualizó' : 'Creó'} registro en ${currentView}: ${bodyObj.nombre || bodyObj.nombre_cat || bodyObj.titulo || bodyObj.rol || 'Item'}`);
        
        loadView(currentView);
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// Delete item
async function deleteItem(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return;
    
    try {
        const response = await fetch(`${API_URLS[currentView]}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('No se pudo eliminar el registro.');
        
        showToast('Registro eliminado con éxito.');
        await logAudit(`Eliminó registro en ${currentView} con ID: ${id}`);
        loadView(currentView);
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// Survey Questions Modals loader
async function openSurveyResponseModal(encuestaId) {
    surveyIdInput.value = encuestaId;
    surveyQuestionsContainer.innerHTML = '<p style="color: var(--text-muted);">Cargando preguntas de la encuesta...</p>';
    surveyModal.classList.add('active');

    try {
        // Fetch preguntas to render
        const response = await fetch(API_URLS.preguntas);
        if (!response.ok) throw new Error('Error al obtener preguntas.');
        const preguntas = await response.json();
        
        if (preguntas.length === 0) {
            surveyQuestionsContainer.innerHTML = '<p style="color: #ef4444;">No hay preguntas creadas. Primero crea preguntas en la pestaña "Preguntas".</p>';
            return;
        }

        let html = '';
        preguntas.forEach((p, idx) => {
            html += `
                <div class="survey-question-item">
                    <label>${idx + 1}. ${p.texto}</label>
                    <div class="rating-scale">
                        ${[1,2,3,4,5].map(num => `
                            <label class="rating-option">
                                <span>${num}</span>
                                <input type="radio" name="pregunta_${p._id}" value="${num}" ${num === 5 ? 'checked' : ''} required>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        surveyQuestionsContainer.innerHTML = html;
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// Submit answers to survey (Registers answers)
async function handleSurveySubmit(e) {
    e.preventDefault();
    const encuestaId = surveyIdInput.value;
    
    // Find all ratings selected
    const inputs = surveyQuestionsContainer.querySelectorAll('input[type="radio"]:checked');
    let totalScore = 0;
    inputs.forEach(input => {
        totalScore += parseInt(input.value);
    });
    
    // Compute average score (or registration format)
    const average = inputs.length > 0 ? (totalScore / inputs.length) : 5;
    
    try {
        // Post response to database
        const response = await fetch('/api/respuestas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                encuesta_id: encuestaId,
                valor: Math.round(average) // Must be min 1, max 5 according to model
            })
        });

        if (!response.ok) throw new Error('Error al registrar la respuesta.');
        
        showToast('Respuestas registradas exitosamente. ¡Gracias por participar!');
        surveyModal.classList.remove('active');
        await logAudit(`Registró respuesta para la encuesta ID: ${encuestaId}`);
    } catch (err) {
        showToast(err.message, 'error');
    }
}

// View Survey Report
async function viewSurveyReport(encuestaId, encuestaTitulo) {
    try {
        const response = await fetch(`${API_URLS.reportes}/${encuestaId}`);
        if (response.status === 404) {
            alert(`No hay respuestas todavía para la encuesta "${encuestaTitulo}". Registra algunas respuestas primero.`);
            return;
        }
        if (!response.ok) throw new Error('Error al obtener reporte.');
        
        const stats = await response.json();
        const stat = stats[0]; // Object: { _id, promedio_satisfaccion, total_participantes }
        
        const satisfaccion = (stat.promedio_satisfaccion).toFixed(2);
        
        alert(`
        === REPORTE DE SATISFACCIÓN ===
        Encuesta: ${encuestaTitulo}
        Promedio de Satisfacción: ${satisfaccion} / 5.0
        Total de Participantes: ${stat.total_participantes}
        ==============================
        `);
        
        await logAudit(`Consultó reporte de satisfacción para encuesta: ${encuestaTitulo}`);
    } catch (err) {
        showToast(err.message, 'error');
    }
}
