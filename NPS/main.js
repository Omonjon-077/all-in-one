(function npsform() {
    const nps = $('.nps'),
        area = nps.find('.nps__area'),
        button = nps.find('.nps__submit'),
        form = nps.find('.nps__form'),
        success = nps.find('.nps__success'),
        url = 'https://ssl.samsung.ru/localCMS/registrator/RegistrateForm',
        cookieName = 'npscdmstatus',
        getCookie = function (name) {
            const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },
        complete = function (str, counter) {
            form.stop().slideUp(counter);
            success.stop().slideDown(counter).html(str);
            $('html, body').stop().animate({scrollTop: $('.kv').offset().top + 'px'}, 300);
        }
    let score = null,
        cid = 'test';
    if (window.location.search.length) {
        window.location.search.split('?')[1].split('&').forEach(el => {
            el = el.split('=');
            if (el[0].toLowerCase() === 'cid') cid = el[1];
        });
    }

    if(cid.toLowerCase() === 'test') {
        complete('Доступ к содержимому страницы временно ограничен<br>Спасибо за обращение', 0);
        return false
    }
    if(getCookie(cookieName)) {
        complete('Благодарим за ваш ответ!', 0);
        return false
    }


    nps.on('click', '.nps__radio', (e) => {
        const radio = $(e.currentTarget);
        radio.addClass('_active').siblings('._active').removeClass('_active');
        score = parseInt(radio.text());
        button.removeAttr('disabled');
    });
    button.click(() => {
        const text = area.val();
        const searchUrl = window.location.search;
        const urlParams = new URLSearchParams(searchUrl);
        const cid = urlParams.get('cid') ?? 'cid';
        const samid = urlParams.get('samid') ?? 'samid';

        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            traditional: true,
            data: {
                CampaignCode : 'RECO',
                Number: score,
                Field1: samid,
                Comment: text,
                TimeOffset: -(new Date()).getTimezoneOffset() / 60,
                Cid: cid
            }
        }).done(data => {
            if (data["Result"] !== undefined) {
                complete('Благодарим за ваш ответ!', 300);
                if (data["Result"] === "OK") {
                    if (cid.toLowerCase() !== 'test') {
                        document.cookie = cookieName + '=1; max-age=86400';
                    }
                    sendOmniEvent('crm nps:submit')
                } else if (data["Result"] === "ERROR") {
                    console.log(data["ErrorsMap"]);
                }
            }
        });
    });
}());

sendOmniEvent = function (tag) {
    var s;
    if (tag) {
        try {
            s = window.s || s_gi('sssamsung4ru,sssamsung4mstglobal');
            s.linkTrackVars = 'eVar26,events';
            s.linkTrackEvents = 'event26';
            s.eVar26 = tag;
            s.events = 'event26';
            return s.tl(this, 'o', tag);
        } catch (error) {
        }
    }
};