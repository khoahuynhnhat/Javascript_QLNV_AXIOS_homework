function Validation() {

    this.kiemTraTatCaKyTu = function(value, selectorError) {
        var regexLetter = /^[A-Z a-z]+$/;
        if(regexLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML='Tất cả phải là ký tự !';
        return false;
    }

    this.kiemTraTatCaSo = function (value, selectorError) {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Tất cả phải là số !';
        return false;
    }

    this.kiemTraGiaTri = function (value, selectorError, minValue, maxValue) {
        if(Number(value) > maxValue || Number(value) < minValue) {
            document.querySelector(selectorError).innerHTML = 'Giá trị từ ' + minValue + ' - ' + maxValue;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraDoDai = function (value, selectorError, minLength, maxLength) {
        if(value.length < minLength || value.length > maxLength) {
            document.querySelector(selectorError).innerHTML = 'Nhập từ ' + minLength + ' - ' + maxLength + ' ký tự !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}