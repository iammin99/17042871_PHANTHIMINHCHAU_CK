export class Product {
    public maSanPham: string;
    public tenSanPham: string;
    public soLuong: number;

    constructor(maSanPham: string, tenSanPham: string, soLuong: number) {
        this.maSanPham = maSanPham;
        this.tenSanPham = tenSanPham;
        this.soLuong = soLuong;
    }
}
