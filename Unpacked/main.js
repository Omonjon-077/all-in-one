window.sendOmniEventUzUnpackedFormSending = function (eVar33, deleteEvar) {
    (function (eVar33) {
        var s;
        if (eVar33) {
            try {
                s = window.s || s_gi('sssamsung4ru,sssamsung4mstglobal');
                s.linkTrackVars = 'eVar33,events';
                s.linkTrackEvents = 'event45';
                s.eVar33 = eVar33;
                s.events = 'event45';
                if (deleteEvar === 'delete') {
                    delete s.eVar33;
                    delete s.events;
                } else {
                    return s.tl(this, 'o', eVar33);
                }
            } catch (error) {}
        }
    })(eVar33)

    return true;
};
window.sendOmniEventUzUnpackedFormSendingOption = function (eVar26, deleteEvar) {
    (function (eVar26) {
        var s;
        if (eVar26) {
            try {
                s = window.s || s_gi('sssamsung4ru,sssamsung4mstglobal');
                s.linkTrackVars = 'eVar26,events';
                s.linkTrackEvents = 'event26';
                s.eVar26 = eVar26;
                s.events = 'event26';
                if (deleteEvar === 'delete') {
                    delete s.eVar26;
                    delete s.events;
                } else {
                    return s.tl(this, 'o', eVar26);
                }
            } catch (error) {}
        }
    })(eVar26)

    return true;
};

const uhfAnalyticSendingTag = {
    succes: 'uz_ru:unpacked:form_successfully_submitted',
    error: 'uz_ru:unpacked:form_send_error',
    name: 'uz_ru:unpacked:form:name',
    tel: 'uz_ru:unpacked:form:tel',
    email: 'uz_ru:unpacked:form:mail',
    age: 'uz_ru:unpacked:form:age',
    bestDevice: 'uz_ru:unpacked:form:best device',
    man: 'uz_ru:unpacked:gender:man',
    woman: 'uz_ru:unpacked:gender:woman',
    samsung: 'uz_ru:unpacked:my device:samsung galaxy',
    apple: 'uz_ru:unpacked:my device:apple iphone',
    other: 'uz_ru:unpacked:my device:other'
}

const UzUnpackedForm = () => {
    const inputControls = document.querySelectorAll('.js-uhf-input-control');
    const inputControlsName = document.querySelector('.js-uhf-input-name');
    const inputControlsEmail = document.querySelector('.js-uhf-input-email');
    const inputControlsPhone = document.querySelector('.js-uhf-input-phone');
    const submitButton = document.querySelector('.js-uhf-button');
    const checkboxSubscribe = document.querySelector('.js-checkbox-subscribe');
    const checkboxAgree = document.querySelector('.js-checkbox-agree');
    const formCommon = document.querySelector('.js-form-common');
    const formSuccess = document.querySelector('.js-form-success');

    const validateEmail = (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
    const formSuccessed = () => inputControlsName.value && inputControlsPhone.value.length === 13 && validateEmail(inputControlsEmail.value) && checkboxAgree.checked ? submitButton.removeAttribute('disabled') : submitButton.setAttribute('disabled', 'disabled');

    const URL = 'https://ssl.samsung.ru/localCMS/registrator/RegistrateForm';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const maskOptionsPhone = {
        mask: '(00)000-00-00',
    };

    const maskPhone = IMask(inputControlsPhone, maskOptionsPhone);

    inputControls.forEach(item => {
        item.addEventListener('blur', event => {
            const _this = event.currentTarget;
            _this.value !== '' ? _this.classList.add('uhf-input__control--focus') : _this.classList.remove('uhf-input__control--focus');

            switch (_this.type) {
                case 'tel':
                    if(_this.value.length !== 13) _this.classList.add('uhf-input__control--invalid');
                    break;
                case 'email':
                    if(!validateEmail(_this.value)) _this.classList.add('uhf-input__control--invalid');
                    break;
                default:
                    if(!_this.value) _this.classList.add('uhf-input__control--invalid');
                    break;
            }
        });
        item.addEventListener('input', event => {
            event.currentTarget.classList.remove('uhf-input__control--invalid');
            formSuccessed()
        });
    });

    checkboxAgree.addEventListener('change', () => formSuccessed());

    submitButton.addEventListener('click', event => {
        const thisDate = new Date();
        const categorySelected = document.querySelectorAll('.js-uhf-checkbox-category:checked');
        const offersSelected = document.querySelectorAll('.js-uhf-checkbox-offers:checked');
        let insterstingCategories = '';
        let insterstingCategoriesAnalityc = ''
        let insterstingOffers = '';
        let insterstingOffersAnalityc = ''
        

        if (event.currentTarget.getAttribute('disabled') === null) {

            if(categorySelected.length !== 0) {
                categorySelected.forEach(item => {
                    insterstingCategories += item.value + '|'
                    insterstingCategoriesAnalityc += item.value + ':'
                })
                insterstingCategories = insterstingCategories.slice(0, -1);
                insterstingCategoriesAnalityc = insterstingCategoriesAnalityc.slice(0, -1);
            }

            if(offersSelected.length !== 0) {
                offersSelected.forEach(item => {
                    insterstingOffers += item.value + '|'
                    insterstingCategoriesAnalityc += item.value + ':'
                })
                insterstingOffers = insterstingOffers.slice(0, -1);
                insterstingOffersAnalityc = insterstingOffersAnalityc.slice(0, -1); 
            }

            const sendData = {
                CampaignCode : 'BQ5UZ',
                Email: inputControlsEmail.value,
                FirstName: inputControlsName.value,
                Tel: inputControlsPhone.value,
                Field1: document.querySelector('.js-uhf-radio-device:checked') ? document.querySelector('.js-uhf-radio-device:checked').value : '',
                Field2: insterstingCategories,
                Field3: insterstingOffers,
                SubscribeEmail: checkboxSubscribe.checked,
                TimeOffset: -thisDate.getTimezoneOffset() / 60,
                Cid: urlParams.get('cid') ?? 'direct'
            }

            event.currentTarget.setAttribute('disabled', 'disabled');

            $.ajax({
                url: URL,
                type: 'POST',
                dataType: "json",
                traditional: true,
                data: sendData,
                success: (data) => {
                    if (data['Result'] === 'OK' || (data['Result'] === 'ERROR' && data['ErrorCode'] === 'DUPL_SN_USER')) {
                        formCommon.classList.add('uhf-hidden');
                        formSuccess.classList.remove('uhf-hidden');
                        window.scrollTo({
                            top: document.querySelector('.textblock.bg-black.text-center.text-mo-center').offsetTop + (document.querySelector('.textblock.bg-black.text-center.text-mo-center').getBoundingClientRect().height / 2),
                            behavior: 'smooth'
                        });
                    }
                    if(data['Result'] === 'OK') {
                        sendOmniEventUzUnpackedFormSending(uhfAnalyticSendingTag.succes);
                        sendOmniEventUzUnpackedFormSending('delete', 'delete');
                        if(inputControlsName.value) {
                            sendOmniEventUzUnpackedFormSendingOption(uhfAnalyticSendingTag.name)
                            sendOmniEventUzUnpackedFormSendingOption('delete', 'delete')
                        }
                        if(inputControlsPhone.value) {
                            sendOmniEventUzUnpackedFormSendingOption(uhfAnalyticSendingTag.tel)
                            sendOmniEventUzUnpackedFormSendingOption('delete', 'delete')
                        }
                        if(inputControlsEmail.value) {
                            sendOmniEventUzUnpackedFormSendingOption(uhfAnalyticSendingTag.email)
                            sendOmniEventUzUnpackedFormSendingOption('delete', 'delete')
                        }
                        if(document.querySelector('.js-uhf-radio-device:checked')) {
                            sendOmniEventUzUnpackedFormSendingOption(document.querySelector('.js-uhf-radio-device:checked').dataset.analityc)
                            sendOmniEventUzUnpackedFormSendingOption('delete', 'delete')
                        }
                        if(categorySelected.length !== 0) {
                            sendOmniEventUzUnpackedFormSendingOption('uz_ru:unpacked:category:' + insterstingCategoriesAnalityc)
                            sendOmniEventUzUnpackedFormSendingOption('delete', 'delete')
                        }
                        if(offersSelected.length !== 0) {
                            sendOmniEventUzUnpackedFormSendingOption('uz_ru:unpacked:offers:' + insterstingOffersAnalityc)
                            sendOmniEventUzUnpackedFormSendingOption('delete', 'delete')
                        }
                    }
                    if(data['Result'] === 'ERROR' && data['ErrorCode'] === 'DUPL_SN_USER') {
                        sendOmniEventUzUnpackedFormSending(uhfAnalyticSendingTag.error)
                        sendOmniEventUzUnpackedFormSending('delete', 'delete')
                    }
                }
            });
        }
    })

    // Hidden form section
    // if (urlParams.has('cid')) {
    //     if (urlParams.get('cid').search('email') !== -1 || urlParams.get('cid').search('push') !== -1) {
    //         document.querySelector('.js-form-cid-show').classList.remove('uhf-hidden');
    //     } else {
    //         formCommon.classList.remove('uhf-hidden');
    //     }
    // } else {
    //     formCommon.classList.remove('uhf-hidden');
    // }
}

UzUnpackedForm();