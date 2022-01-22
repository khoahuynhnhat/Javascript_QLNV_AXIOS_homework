// console.log(axios);


function getApiData() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
    });

    //call API thành công
    promise.then(function (result) {
        //hàm sẽ tự gọi khi api thành công
        console.log('result', result.data);
        renderTable(result.data);
    })
    promise.catch(function (err) {
        //call API thất bại
        console.log('error', err.response?.data);

    })
}

getApiData();

//viết hàm hiển thị danh sách nhân viên
function renderTable(mangNhanVien) {
    var htmlContent = '';
    for (var i = 0; i < mangNhanVien.length; i++) {
        //mỗi lần duyệt lấy ra 1 nhân viên
        var nhanVien = mangNhanVien[i];
        htmlContent +=
            `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.luongCoBan}</td>
                <td>${nhanVien.soGioLamTrongThang}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
                    <button class="btn btn-primary" onclick="suaNhanVien('${nhanVien.maNhanVien}')">Sửa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('tbody').innerHTML = htmlContent;
}


var kiemTra = new Validation();
//viết chức năng cho nút thêm nhân viên
document.querySelector('#btnThemNhanVien').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;

    //lấy ra mảng các thẻ option
    var chonChucVu = document.querySelector('#chucVu');
    //lấy ra các thẻ option của thẻ slectChucVu
    var mangChucVu = chonChucVu.options;
    console.log('mangchucvu', mangChucVu);
    //lấy ra index của option được chọn dựa trên thẻ select
    var chucVuDaChon = chonChucVu.selectedIndex;
    // console.log(arrTagOption[indexOptionSelected].innerHTML);
    nhanVien.chucVu = mangChucVu[chucVuDaChon].innerHTML;

    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    console.log('nhân viên', nhanVien);

    //kiểm tra hợp lệ (validation)
    var valid = true;

    //kiểm tra độ dài
    valid &= kiemTra.kiemTraDoDai(nhanVien.maNhanVien,'#error_minMaxLength_maNhanVien',4,6);

    //kiểm tra input phải là ký tự
    valid &= kiemTra.kiemTraTatCaKyTu(nhanVien.tenNhanVien,'#error_allLetter_tenNhanVien');

    //kiểm tra giá trị
    valid &= kiemTra.kiemTraGiaTri(nhanVien.luongCoBan,'#error_minMaxValue_luongCoBan',1000000,20000000) & kiemTra.kiemTraGiaTri(nhanVien.soGioLamTrongThang,'#error_minMaxValue_soGioLamTrongThang',50,150)
    
    if(!valid) {
        return;
    }
    //call API POST thêm nhân viên
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien
    })
    promise.then(function (result) {
        console.log('result', result.data);
        getApiData();
    })
    promise.catch(function (err) {
        console.log('error', err.response?.data);

    })
    
}

//cập nhật nhân viên call API PUT
document.querySelector('#btnCapNhatThongTin').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;

    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;

    //lấy ra mảng các thẻ option
    var chonChucVu = document.querySelector('#chucVu');
    //lấy ra các thẻ option của thẻ slectChucVu
    var mangChucVu = chonChucVu.options;
    console.log('mangchucvu', mangChucVu);
    //lấy ra index của option được chọn dựa trên thẻ select
    var chucVuDaChon = chonChucVu.selectedIndex;
    // console.log(arrTagOption[indexOptionSelected].innerHTML);
    nhanVien.chucVu = mangChucVu[chucVuDaChon].innerHTML;


    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    console.log('nhân viên', nhanVien);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + nhanVien.maNhanVien,
        method: 'PUT',
        data: nhanVien
    })
    promise.then(function (result) {
        console.log('result', result.data);
        getApiData();
    })
    promise.catch(function (err) {
        console.log('error', err);

    })

    clearInput();
}

function clearInput() {
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#tenNhanVien').value = '';
    // document.querySelector('chucVu').value = '';
    document.querySelector('#luongCoBan').value = '';
    document.querySelector('#soGioLamTrongThang').value = '';
}

//viết hàm xóa nhân viên, call API DELETE
function xoaNhanVien(maNhanVienClick) {
    console.log('mã nhan viên', maNhanVienClick);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNhanVienClick,
        method: 'DELETE'
    })
    promise.then(function (result) {
        console.log('result', result.data);
        getApiData();
    })
    promise.catch(function (err) {
        console.log('error', err);

    })
}

//viết hàm sửa nhân viên, call API Get
function suaNhanVien(maNhanVienClick) {
    console.log(maNhanVienClick);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVienClick,
        method: 'GET'
    })

    promise.then(function (result) {
        console.log('result', result.data);
        var nhanVien = result.data;

        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;

        document.querySelector('#chucVu').value = nhanVien.heSoChucVu;

        //lấy ra mảng các thẻ option
        var chonChucVu = document.querySelector('#chucVu');
        //lấy ra các thẻ option của thẻ slectChucVu
        var mangChucVu = chonChucVu.options;
        console.log('mangchucvu', mangChucVu);
        //lấy ra index của option được chọn dựa trên thẻ select
        var chucVuDaChon = chonChucVu.selectedIndex;
        // console.log(arrTagOption[indexOptionSelected].innerHTML);
        nhanVien.chucVu = mangChucVu[chucVuDaChon].innerHTML;


        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;
        document.querySelector('#maNhanVien').disabled = true;
    })

    promise.catch(function (err) {
        console.log('error', err);

    })
}

