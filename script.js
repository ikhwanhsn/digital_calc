const hamburger = document.querySelector('.hamburger');
const hideMenu = document.querySelector('.hide-menu');
const closeMenu = document.querySelector('.close-menu');

hamburger.addEventListener('click', function () {
  hideMenu.classList.toggle('hidden');
});
closeMenu.addEventListener('click', function () {
  hideMenu.classList.toggle('hidden');
});

// preview
const previewData = document.querySelector('.count-output');
previewData.innerHTML = '0';
let output = document.getElementById('output');
output.innerHTML = '0';

function insert(num) {
  if (shouldClear) {
    clearOutput();
    shouldClear = false;
  }
  // Memeriksa apakah output masih berisi angka default '0'
  if (output.textContent === '0' && /\d/.test(num)) {
    output.textContent = '';
  }

  // Memeriksa apakah input adalah operator dan output masih kosong
  if ((output.textContent === '' || output.textContent === '0') && /[+\-*/%^.()]/.test(num)) {
    return;
  }

  // Memeriksa apakah input adalah operator dan karakter terakhir adalah operator
  if (/[+\-*/%^.()]/.test(num) && /[+\-*/%^.()]/.test(output.textContent.slice(-1))) {
    // Mengganti operator lama dengan operator baru
    output.textContent = output.textContent.slice(0, -1) + num;
  } else {
    // Menambahkan angka atau operator baru
    output.textContent += num;
  }
}

function clearOutput() {
  previewData.innerHTML = '0';
  output.innerHTML = '0';
  shouldClear = true;
}

window.onload = function () {
  clearOutput();
};

function backspace() {
  let outputString = output.innerHTML;
  if (outputString.length === 1) {
    // jika hanya ada satu angka pada layar kalkulator
    output.innerHTML = '0'; // setel layar kalkulator ke 0
  } else {
    if (!shouldClear) {
      output.innerHTML = outputString.slice(0, -1); // hapus angka terakhir dari layar kalkulator
    } else {
      clearOutput();
    }
  }
}

function calculate() {
  previewData.innerHTML = output.innerHTML;
  let result = eval(output.innerHTML);
  output.innerHTML = result;
  isDecimal = output.innerHTML.includes('.'); // cek apakah hasilnya desimal
  if (isDecimal) {
    numDecimal = output.innerHTML.length - output.innerHTML.indexOf('.') - 1; // hitung jumlah digit desimal
  } else {
    numDecimal = 0;
  }
  shouldClear = true; // setel agar output dihapus saat pengguna memasukkan angka berikutnya
  // }
}

// keyboard
document.addEventListener('keydown', function (event) {
  const key = event.key;
  const validKeys = ['0', '000', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '/', '*', '-', '+', '=', 'Enter', 'Backspace', 'Delete', '%', '^', '(', ')', '.'];
  if (validKeys.includes(key)) {
    if (key === 'Enter' || key === '=') {
      let enterButton = document.getElementById('enter-button');
      enterButton.classList.add('bg-slate-400', 'transition-all');
      setTimeout(function () {
        enterButton.classList.remove('bg-slate-400', 'transition-all');
      }, 150);
      calculate();
    } else if (key === 'Backspace') {
      let backspaceButton = document.getElementById('backspace-button');
      backspaceButton.classList.add('bg-slate-400', 'transition-all');
      setTimeout(function () {
        backspaceButton.classList.remove('bg-slate-400', 'transition-all');
      }, 150);
      backspace();
    } else if (key === 'Delete') {
      let deleteButton = document.getElementById('delete-button');
      deleteButton.classList.add('bg-slate-400', 'transition-all');
      setTimeout(function () {
        deleteButton.classList.remove('bg-slate-400', 'transition-all');
      }, 150);
      clearOutput();
    } else {
      let otherButton = document.getElementById(`button-${key}`);
      otherButton.classList.add('bg-slate-400', 'transition-all');
      setTimeout(function () {
        otherButton.classList.remove('bg-slate-400', 'transition-all');
      }, 150);
      insert(key);
    }
  }
});

// setting all menu
const listMenu = document.querySelector('.list-menu');
const menuActive = document.querySelector('.menu-active');
if (menuActive) {
  listMenu.classList.add('bg-slate-500', 'text-slate-200');
  // listMenu.classList.add('text-slate-200');
}
listMenu.addEventListener('click', function () {
  listMenu.classList.remove('menu-active');
  listMenu.classList.add('menu-active');
});

// switch button
function switchButton() {
  Swal.fire(
    'This feature is under development!',
    'You can try it later...',
    'info'
  )
  // alert('This feature is under development');
  // document.querySelector('.all-number').classList.toggle('hidden');
  // document.querySelector('.switch-menu').classList.toggle('hidden');
}
