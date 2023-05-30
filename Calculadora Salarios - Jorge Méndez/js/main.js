// Proceso para calcular salario de empleados y patronos.
// Jorge Alberto Vanegas Méndez.

// Paso 1. Calcular los descuentos AFP, ISSS.
//                   ISSS
// Patronal: 7.5%
// Trabajador/Empleado: 3% --> Límite de 1,000.00

//                   AFP
// Patronal: 7.75%
// Trabajador/Empleado: 7.25%

// Declaración de variables
// Las variables declaradas con let tienen un ámbito de bloque. 
// Esto significa que solo están disponibles 
// dentro del bloque en el que se declaran. 
let isss_empleado;
let isss_patronal;
let afp_empleado;
let afp_patronal;
let afpSalaryDeduction;
let renta_inicial;
// no permiten redeclaración.
let saldo_liquido;

const calcularDescuentos = (salario) => {
    // Descuento ISSS
    const isss_limite_empleado = 1000 * 0.03;
    const isss_limite_patronal = 1000 * 0.075;
    isss_patronal = salario <= 1000 ? salario * 0.075 : isss_limite_patronal;
    isss_empleado = salario <= 1000 ? salario * 0.03 : isss_limite_empleado;

    // Descuento AFP
    afp_patronal = salario * 0.0775;
    afp_empleado = salario * 0.0725;

    // Salario - AFP
    afpSalaryDeduction = salario - afp_empleado;

    // Calcular la renta
    calcularRenta(salario, afp_empleado, isss_empleado);

    // Descuento total
    const totalDeduction = (afp_empleado + isss_empleado + renta_inicial);

    // Retornar todas las variables para su uso
    return {
        isss_empleado,
        isss_patronal,
        afp_empleado,
        afp_patronal,
        afpSalaryDeduction,
        totalDeduction
    };
};

const calcularRenta = (salario, afp, isss) => {
    let salario_menos_descuento = salario - (afp + isss);

    // TRAMOS
    // TRAMO I
    if (salario_menos_descuento >= 0.01 && salario_menos_descuento <= 472.00) {
        renta_inicial = 0.00;

        saldo_liquido = (salario_menos_descuento - renta_inicial);

        // TRAMO II
        // Sobre el exceso de 472.00
        // 10%
        // cuota fija: 17.67
    } else if (salario_menos_descuento >= 472.01 && salario_menos_descuento <= 895.24) {
        renta_inicial = salario_menos_descuento - 472.00;
        renta_inicial *= 0.10;
        renta_inicial += 17.67;

        saldo_liquido = (salario_menos_descuento - renta_inicial);

        // TRAMO III
        // 20%
        // Sobre el exceso de 895.24
        // cuota fija: 60.00
    } else if (salario_menos_descuento >= 895.25 && salario_menos_descuento <= 2038.10) {
        renta_inicial = salario_menos_descuento - 895.24;
        renta_inicial *= 0.20;
        renta_inicial += 60;

        saldo_liquido = (salario_menos_descuento - renta_inicial);

        // TRAMO IV
        // 30%
        // Sobre el exceso de 2,038.10
        // cuota fija: 288.57
    } else if (salario_menos_descuento >= 2038.11 && salario_menos_descuento <= 1000000000) {
        renta_inicial = salario_menos_descuento - 2038.10;
        renta_inicial *= 0.30;
        renta_inicial += 288.57;

        saldo_liquido = (salario_menos_descuento - renta_inicial);
    }
};

// APLICANDO LÓGICA

// creando el evento
let botonCalcular = document.getElementById('btnCalculate');
botonCalcular.addEventListener('click', function () {
    // Obteniendo el salario
    let salary = parseFloat(document.getElementById('salary_value').value);
    // Si el salario no es nulo y sea mayor que cero
    if (!isNaN(salary) && salary > 0) {
        console.log(salary)
        const descuentos = calcularDescuentos(salary);
        mostrarResultados(descuentos);
    }
})

let limpiarDatos = document.getElementById('btnClear');
limpiarDatos.addEventListener('click', function () {
        // obtener por id los campos para eliminar los datos ingresados.
    let salary = document.getElementById('salary_value');
    salary.value = "";

    let patronal_afp = document.getElementById('patronal_AFP');
    patronal_afp.value = "";

    let patronal_isss = document.getElementById('patronal_ISSS');
    patronal_isss.value = "";

    let laboral_afp = document.getElementById('laboral_AFP');
    laboral_afp.value = "";

    let laboral_isss = document.getElementById('laboral_ISSS');
    laboral_isss.value = "";

    let salary_afp = document.getElementById('salary_AFP');
    salary_afp.value = "";

    let v_discount = document.getElementById('v_discount');
    v_discount.value = "";

    let v_renta = document.getElementById('v_renta');
    v_renta.value = "";

    let liquid_salary = document.getElementById('liquid_salary');
    liquid_salary.value = "";
})

function mostrarResultados(descuentos) {
    // obtener por id los campos para poder asignarles el valor obtenido.
    let patronal_afp = document.getElementById('patronal_AFP');
    patronal_afp.value = `$ ${descuentos.afp_patronal}`;

    let patronal_isss = document.getElementById('patronal_ISSS');
    patronal_isss.value = `$ ${descuentos.isss_patronal}`;

    let laboral_afp = document.getElementById('laboral_AFP');
    laboral_afp.value = `$ ${descuentos.afp_empleado}`;

    let laboral_isss = document.getElementById('laboral_ISSS');
    laboral_isss.value = `$ ${descuentos.isss_empleado}`;

    let salary_afp = document.getElementById('salary_AFP');
    salary_afp.value = `$ ${descuentos.afpSalaryDeduction}`;

    let v_discount = document.getElementById('v_discount');
    v_discount.value = `$ ${descuentos.totalDeduction}`;

    let v_renta = document.getElementById('v_renta');
    v_renta.value = `$ ${renta_inicial}`;

    let liquid_salary = document.getElementById('liquid_salary');
    liquid_salary.value = `$ ${saldo_liquido}`;
}

/*
console.log(`ISSS (Empleado): $${descuentos.isss_empleado}`);
console.log(`ISSS (Patronal): $${descuentos.isss_patronal}`);
console.log(`AFP (Empleado): $${descuentos.afp_empleado}`);
console.log(`AFP (Patronal): $${descuentos.afp_patronal}`);
console.log(`Salario - AFP: $${descuentos.afpSalaryDeduction}`);
console.log(`Total deduction: $${descuentos.totalDeduction}`);
console.log(`Impuesto sobre la renta: $${renta_inicial}`);
console.log(`Salario Liquido: $${saldo_liquido}`); */