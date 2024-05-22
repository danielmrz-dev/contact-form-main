const camposDoFormulario = document.querySelectorAll("[required]");
const nome = document.querySelector("[data-nome]");
const sobrenome = document.querySelector("[data-sobrenome]");
const email = document.querySelector("[data-email]");
const mensagem = document.querySelector("[data-mensagem]");
const consentimento = document.querySelector("[data-consentimento]");
const radioInputs = document.querySelectorAll('input[type="radio"]');
const submitBtn = document.querySelector('button[type="submit"]');
const formulario = document.querySelector(".form");
const successMsg = document.querySelector(".success-msg");

nome.focus();

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("invalid", (e) => e.preventDefault());
});

radioInputs.forEach((input) => {
    const background = input.closest(".form__query-type-containers");
    input.addEventListener("focus", () => {
        background.classList.add("green-bg");
    });
    input.addEventListener("blur", () => {
        background.classList.remove("green-bg");
    });
});


submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    validaInputTexto(nome);
    validaInputTexto(sobrenome);
    validarEmail(email.value);
    validaQueryType();
    validaInputTexto(mensagem);
    validaConsentimento();
    
    if (
        validaInputTexto(nome) &&
        validaInputTexto(sobrenome) &&
        validarEmail(email.value) &&
        validaQueryType() &&
        validaInputTexto(mensagem) &&
        validaConsentimento()
    ) {
        successMsg.classList.add("active-success-msg");
        nome.value = "";
        sobrenome.value = "";
        email.value = "";
        radioInputs.forEach(radio => radio.checked = false)
        mensagem.value = "";
        consentimento.checked = false
        setTimeout(() => {
            successMsg.classList.remove("active-success-msg");            
        }, 3500)
    }
});

function validaInputTexto(input) {
    let mensagem;

    tiposDeErro.forEach((erro) => {
        if (input.validity[erro]) {
            mensagem = mensagens[input.name][erro];
        }
    });

    const mensagemDeErro = input
        .closest(".parent")
        .querySelector(".form__error-msg");
    const validaInput = input.checkValidity();

    if (!validaInput) {
        input.classList.add("input-error");
        mensagemDeErro.textContent = mensagem;
        mensagemDeErro.style.opacity = "1";
        return false;
    } else {
        input.classList.remove("input-error");
        mensagemDeErro.style.opacity = "0";
        return true;
    }
}

function validarEmail(emailAddress) {
    var padrao =
        /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        
    const mensagemDeErro = document.querySelector(".invalid-email");

    if (!padrao.test(emailAddress)) {
        email.classList.add("input-error");
        mensagemDeErro.textContent = "Please enter a valid email address";
        mensagemDeErro.style.opacity = "1";
        return false;
    } else {
        email.classList.remove("input-error");
        mensagemDeErro.style.opacity = "0";
        return true;
    }
}

function validaQueryType() {
    const selectedQueryType = document.querySelector(
        'input[type="radio"]:checked'
    );
    const erro = document.querySelector(".query-error");
    if (!selectedQueryType) {
        erro.style.opacity = "1";
        return false;
    } else {
        erro.style.opacity = "0";
        return true;
    }
}

function validaConsentimento() {
    const mensagemDeErro = consentimento
        .closest(".parent")
        .querySelector(".form__error-msg");
    if (!consentimento.checked) {
        mensagemDeErro.textContent =
            "To submit this form, please consent to being contacted";
        mensagemDeErro.style.opacity = "1";
        return false;
    } else {
        mensagemDeErro.style.opacity = "0";
        return true;
    }
}

const tiposDeErro = ["valueMissing", "patternMismatch", "tooShort"];

const mensagens = {
    nome: {
        valueMissing: "This field is required",
        tooShort: "Too short",
    },
    sobrenome: {
        valueMissing: "This field is required",
        tooShort: "Too short",
    },
    email: {
        valueMissing: "This field is required",
        patternMismatch: "Please enter a valid email",
    },
    mensagem: {
        valueMissing: "This field is required",
        tooShort: "Too short (min: 30 characters)",
    },
};
