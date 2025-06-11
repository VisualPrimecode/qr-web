const baseUrl = 'https://node-sqlserver-uvs5.onrender.com/api';

async function generarQR() {
  const ventaId = document.getElementById('ventaId').value.trim();
  const resultado = document.getElementById('resultado');
  const contenido = document.getElementById('contenido');
  const qrImagen = document.getElementById('qrImagen');
  const error = document.getElementById('error');

  error.textContent = '';
  resultado.style.display = 'none';

  if (!ventaId) {
    error.textContent = '⚠️ Debes ingresar un ID de venta.';
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/datosQR/${ventaId}`);
    if (!response.ok) {
      throw new Error('ID no válido o error del servidor.');
    }

    const data = await response.json();
    contenido.textContent = data.contenido;
    qrImagen.src = data.qrBase64;

    resultado.style.display = 'block';
  } catch (err) {
    error.textContent = `❌ Error: ${err.message}`;
  }
}
