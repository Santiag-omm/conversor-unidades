const unidadesPorCategoria = {
  temperatura: [
    { value: 'celsius', label: 'Celsius' },
    { value: 'fahrenheit', label: 'Fahrenheit' },
    { value: 'kelvin', label: 'Kelvin' },
  ],
  distancia: [
    { value: 'metros', label: 'Metros' },
    { value: 'kilometros', label: 'Kilómetros' },
    { value: 'millas', label: 'Millas' },
  ],
  peso: [
    { value: 'gramos', label: 'Gramos' },
    { value: 'kilogramos', label: 'Kilogramos' },
    { value: 'libras', label: 'Libras' },
  ],
};

const valorInput = document.getElementById('valor');
const categoriaSelect = document.getElementById('categoria');
const desdeSelect = document.getElementById('desde');
const hastaSelect = document.getElementById('hasta');
const convertirButton = document.getElementById('convertir');
const limpiarButton = document.getElementById('limpiar');
const resultadoDiv = document.getElementById('resultado');

function crearOpciones(unidades) {
  desdeSelect.innerHTML = '';
  hastaSelect.innerHTML = '';

  unidades.forEach((unidad) => {
    const opcionDesde = document.createElement('option');
    opcionDesde.value = unidad.value;
    opcionDesde.textContent = unidad.label;
    desdeSelect.appendChild(opcionDesde);

    const opcionHasta = document.createElement('option');
    opcionHasta.value = unidad.value;
    opcionHasta.textContent = unidad.label;
    hastaSelect.appendChild(opcionHasta);
  });
}

function actualizarUnidades() {
  const categoria = categoriaSelect.value;
  crearOpciones(unidadesPorCategoria[categoria]);
  resultadoDiv.textContent = 'Introduce un valor y selecciona las unidades para ver el resultado.';
}

function convertirTemperatura(valor, desde, hasta) {
  if (desde === hasta) return valor;

  const enCelsius = {
    celsius: valor,
    fahrenheit: (valor - 32) * 5 / 9,
    kelvin: valor - 273.15,
  }[desde];

  const conversion = {
    celsius: enCelsius,
    fahrenheit: enCelsius * 9 / 5 + 32,
    kelvin: enCelsius + 273.15,
  }[hasta];

  return conversion;
}

function convertirDistancia(valor, desde, hasta) {
  if (desde === hasta) return valor;

  const enMetros = {
    metros: valor,
    kilometros: valor * 1000,
    millas: valor / 0.000621371,
  }[desde];

  const conversion = {
    metros: enMetros,
    kilometros: enMetros / 1000,
    millas: enMetros * 0.000621371,
  }[hasta];

  return conversion;
}

function convertirPeso(valor, desde, hasta) {
  if (desde === hasta) return valor;

  const enGramos = {
    gramos: valor,
    kilogramos: valor * 1000,
    libras: valor / 0.00220462,
  }[desde];

  const conversion = {
    gramos: enGramos,
    kilogramos: enGramos / 1000,
    libras: enGramos * 0.00220462,
  }[hasta];

  return conversion;
}

function obtenerConversion(valor, categoria, desde, hasta) {
  switch (categoria) {
    case 'temperatura':
      return convertirTemperatura(valor, desde, hasta);
    case 'distancia':
      return convertirDistancia(valor, desde, hasta);
    case 'peso':
      return convertirPeso(valor, desde, hasta);
    default:
      return NaN;
  }
}

function mostrarResultado(texto) {
  resultadoDiv.textContent = texto;
}

function manejarConvertir() {
  const valor = Number(valorInput.value);
  const categoria = categoriaSelect.value;
  const desde = desdeSelect.value;
  const hasta = hastaSelect.value;

  if (Number.isNaN(valor)) {
    mostrarResultado('Por favor ingresa un número válido.');
    return;
  }

  const resultado = obtenerConversion(valor, categoria, desde, hasta);
  const unidades = {
    temperatura: { desde: desdeSelect.options[desdeSelect.selectedIndex].textContent, hasta: hastaSelect.options[hastaSelect.selectedIndex].textContent },
    distancia: { desde: desdeSelect.options[desdeSelect.selectedIndex].textContent, hasta: hastaSelect.options[hastaSelect.selectedIndex].textContent },
    peso: { desde: desdeSelect.options[desdeSelect.selectedIndex].textContent, hasta: hastaSelect.options[hastaSelect.selectedIndex].textContent },
  }[categoria];

  mostrarResultado(`${valor} ${unidades.desde} equivalen a ${resultado.toFixed(3)} ${unidades.hasta}.`);
}

function manejarLimpiar() {
  valorInput.value = '';
  categoriaSelect.value = 'temperatura';
  actualizarUnidades();
}

categoriaSelect.addEventListener('change', actualizarUnidades);
convertirButton.addEventListener('click', manejarConvertir);
limpiarButton.addEventListener('click', manejarLimpiar);

document.addEventListener('DOMContentLoaded', actualizarUnidades);
