function generarHoras() {
    const select = document.getElementById('horaCombobox');
    for (let hora = 0; hora < 24; hora++) {
        const option = document.createElement('option');
        const horaStr = hora.toString().padStart(2, '0') + ':00';
        option.value = horaStr;
        option.textContent = horaStr;
        select.appendChild(option);
    }
}

function guardarEvento() {
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('horaCombobox').value;
    const descripcion = document.getElementById('descripcion').value;
    const participantes = document.getElementById('participantes').value;

    if (fecha && hora && descripcion && participantes) {
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate();
        const mes = fechaObj.getMonth();
        const año = fechaObj.getFullYear();

        if (mes === currentMonth && año === currentYear) {
            const dayElement = document.querySelector(`.day[data-day='${dia}']`);
            if (dayElement) {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');
                eventElement.innerHTML = `
                    <p><strong>Fecha:</strong> ${fecha}</p>
                    <p><strong>Hora:</strong> ${hora}</p>
                    <p><strong>Descripción:</strong> ${descripcion}</p>
                    <p><strong>Participantes:</strong> ${participantes}</p>
                `;
                dayElement.appendChild(eventElement);

            }
            
        }

        limpiar();

    } else {
        alert('Por favor, complete todos los campos antes de guardar el evento.');
    }
}
function limpiar(){
    
    document.getElementById('fecha').value = '';
    document.getElementById('horaCombobox').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('participantes').value = '';
}

generarHoras();

const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const daysContainer = document.getElementById('days');
    daysContainer.innerHTML = ''; 

    const firstDay = new Date(year, month, 1).getDay(); // First day of the month
    const lastDay = new Date(year, month + 1, 0).getDate(); // Last day of the month

    document.getElementById('monthName').textContent = monthNames[month];
    document.getElementById('yearNumber').textContent = year;

    // Days of previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const daysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = daysFromPrevMonth; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'day-disabled');
        dayElement.textContent = prevMonthLastDay - i + 1;
        daysContainer.appendChild(dayElement);
        console.log(dayElement)
    }

    // Days of current month
    for (let i = 1; i <= lastDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;
        dayElement.dataset.day = i; 
        daysContainer.appendChild(dayElement);
    }

    // Days of next month
    const daysFromNextMonth = 42 - daysContainer.children.length;

    for (let i = 1; i <= daysFromNextMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'day-disabled');
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);
    }
}

function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
}

function consultarEvento() {

    const fechaInput = document.getElementById('buscar').value;
    const fechaObj = new Date(fechaInput);
    
    
    // Verificar si la fecha ingresada es válida
    if (isNaN(fechaObj.getTime())) {
        alert("Por favor, ingrese una fecha válida.");
        return;
    }

    const dia = fechaObj.getDay();
    const mes = fechaObj.getMonth();
    const año = fechaObj.getFullYear();

    // Busca todos los eventos para la fecha seleccionada
    const events = document.querySelectorAll(`.day[data-day='${dia}'] .event`);

    if (events.length >= 0) {
        events.forEach(event => {
            
            const hora = event.querySelector('p:nth-of-type(1)').textContent;
            const descripcion = event.querySelector('p:nth-of-type(2)').textContent;
            const participantes = event.querySelector('p:nth-of-type(3)').textContent;

            
            console.log("Fecha:", `${dia}/${mes + 1}/${año}`);
            console.log("Hora:", hora);
            console.log("Descripción:", descripcion);
            console.log("Participantes:", participantes);
        });

        
        const dayElement = document.querySelector(`.day[data-day='${dia}']`);
        dayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        console.log("Fecha:", `${dia}/${mes + 1}/${año}`);
        
    } else {
        alert("No se encontraron eventos para la fecha seleccionada.");
    }
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);

function eliminarEvento() {
    const fechaEliminar = document.getElementById('eliminar').value;

    if (fechaEliminar) {
        const fechaObj = new Date(fechaEliminar);
        const dia = fechaObj.getDate();
        const mes = fechaObj.getMonth();
        const año = fechaObj.getFullYear();

        if (mes === currentMonth && año === currentYear) {
            const dayElement = document.querySelector(`.day[data-day='${dia}']`);
            if (dayElement) {
                // Selecciona todos los eventos dentro del día específico
                const eventos = dayElement.querySelectorAll('.event');
                eventos.forEach(evento => {
                    // Verifica si la fecha del evento coincide con la fecha a eliminar
                    const fechaEvento = evento.querySelector('p').innerText.split(': ')[1];
                    if (fechaEvento === fechaEliminar) {
                        dayElement.removeChild(evento);
                    }
                });
            } else {
                alert('No se encontraron eventos para el día especificado.');
            }
        } else {
            alert('La fecha no corresponde al mes y año actual.');
        }
    } else {
        alert('Por favor, ingrese una fecha para eliminar el evento.');
    }
}

function limpiar() {
    document.getElementById('fecha').value = '';
    document.getElementById('horaCombobox').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('participantes').value = '';
}
