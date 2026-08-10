const surveyForm = document.getElementById('survey-form');
const surveyIdInput = document.getElementById('survey-id-input');
const questionsContainer = document.getElementById('survey-questions-container');
const commentInput = document.getElementById('survey-comment');
const submitButton = document.getElementById('btn-survey-submit');
const toastContainer = document.getElementById('toast-container');

const directFeedbackForm = document.getElementById('direct-feedback-form');
const directFeedbackComment = document.getElementById('direct-feedback-comment');
const directFeedbackSubmit = document.getElementById('btn-direct-feedback-submit');

let encuestaActiva = null;
let preguntasEncuesta = [];

document.addEventListener('DOMContentLoaded', cargarEncuesta);

async function cargarEncuesta() {
    try {
        const [encuestasResponse, preguntasResponse] = await Promise.all([
            fetch('/api/encuestas'),
            fetch('/api/preguntas')
        ]);

        if (!encuestasResponse.ok || !preguntasResponse.ok) {
            throw new Error('No se pudo cargar la encuesta.');
        }

        const encuestas = await encuestasResponse.json();
        const preguntas = await preguntasResponse.json();

        encuestaActiva = encuestas.find(encuesta => {
            return encuesta.estado === true ||
                encuesta.estado === 'Activa' ||
                encuesta.estado === 'activa';
        });

        if (!encuestaActiva && encuestas.length > 0) {
            encuestaActiva = encuestas[0];
        }

        if (!encuestaActiva) {
            questionsContainer.innerHTML =
                '<p>No hay una encuesta disponible en este momento.</p>';

            submitButton.disabled = true;
            return;
        }

        surveyIdInput.value = encuestaActiva._id;

        preguntasEncuesta = preguntas.slice(0, 8);

        if (preguntasEncuesta.length === 0) {
            questionsContainer.innerHTML =
                '<p>No hay preguntas registradas.</p>';

            submitButton.disabled = true;
            return;
        }

        mostrarPreguntas();
    } catch (error) {
        questionsContainer.innerHTML =
            '<p>No fue posible cargar la encuesta.</p>';

        submitButton.disabled = true;
        mostrarMensaje(error.message, 'error');
    }
}

function mostrarPreguntas() {
    questionsContainer.innerHTML = preguntasEncuesta
        .map((pregunta, index) => {
            return `
                <div class="form-group survey-question">
                    <label>
                        ${index + 1}. ${pregunta.texto}
                    </label>

                    <div class="rating-options">
                        ${crearOpciones(pregunta._id)}
                    </div>
                </div>
            `;
        })
        .join('');
}

function crearOpciones(preguntaId) {
    let opciones = '';

    for (let valor = 1; valor <= 5; valor++) {
        opciones += `
            <label class="rating-option">
                <input
                    type="radio"
                    name="pregunta-${preguntaId}"
                    value="${valor}"
                >
                <span>${valor}</span>
            </label>
        `;
    }

    return opciones;
}

surveyForm.addEventListener('submit', async event => {
    event.preventDefault();

    const respuestas = [];

    for (const pregunta of preguntasEncuesta) {
        const opcionSeleccionada = document.querySelector(
            `input[name="pregunta-${pregunta._id}"]:checked`
        );

        if (!opcionSeleccionada) {
            mostrarMensaje(
                'Debe responder todas las preguntas.',
                'error'
            );

            return;
        }

        respuestas.push({
            pregunta_id: pregunta._id,
            valor: Number(opcionSeleccionada.value)
        });
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Identificador único del envío: agrupa todas las respuestas de este
    // participante para que el reporte cuente 1 participante, no 1 por pregunta.
    const intentoId = crypto.randomUUID();

    try {
        for (const respuesta of respuestas) {
            const response = await fetch('/api/respuestas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    encuesta_id: encuestaActiva._id,
                    pregunta_id: respuesta.pregunta_id,
                    valor: respuesta.valor,
                    intento_id: intentoId
                })
            });

            if (!response.ok) {
                throw new Error('No se pudieron registrar las respuestas.');
            }
        }

        const comentario = commentInput.value.trim();

        if (comentario !== '') {
            const feedbackResponse = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    encuesta_id: encuestaActiva._id,
                    comentario: comentario
                })
            });

            if (!feedbackResponse.ok) {
                throw new Error('Las respuestas se registraron, pero no el comentario.');
            }
        }

        surveyForm.reset();

        mostrarMensaje(
            'Gracias. La encuesta fue enviada correctamente.',
            'success'
        );
    } catch (error) {
        mostrarMensaje(error.message, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Registrar respuestas';
    }
});

function mostrarMensaje(mensaje, tipo) {
    toastContainer.innerHTML = `
        <div class="toast ${tipo}">
            ${mensaje}
        </div>
    `;

    setTimeout(() => {
        toastContainer.innerHTML = '';
    }, 4000);
}

directFeedbackForm.addEventListener('submit', async event => {
    event.preventDefault();

    const comentario = directFeedbackComment.value.trim();

    if (comentario === '') {
        mostrarMensaje(
            'Escriba un comentario antes de enviar.',
            'error'
        );

        return;
    }

    directFeedbackSubmit.disabled = true;
    directFeedbackSubmit.textContent = 'Enviando...';

    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comentario: comentario
            })
        });

        if (!response.ok) {
            throw new Error('No se pudo enviar el feedback.');
        }

        directFeedbackForm.reset();

        mostrarMensaje(
            'Gracias. Su feedback fue enviado correctamente.',
            'success'
        );
    } catch (error) {
        mostrarMensaje(error.message, 'error');
    } finally {
        directFeedbackSubmit.disabled = false;
        directFeedbackSubmit.textContent = 'Enviar feedback';
    }
});