let currentOrderCode = "";
let isOrderValid = false;
let totalRevenue = 0;
let totalOrders = 0;

const formatMoney = (amount) => {
    return amount.toLocaleString("vi-VN") + " VNĐ";
};
let isRunning = true;
while (isRunning) {
    let menu = 
        "=====================================================\n" +
        "    HỆ THỐNG THANH TOÁN NHÀ SÁCH TRI THỨC\n" +
        "=====================================================\n" +
        "1. Nhập và kiểm chuẩn mã đơn hàng\n" +
        "2. Tính tiền đơn sách\n" +
        "0. Thoát chương trình\n" +
        "=====================================================\n" +
        "Vui lòng nhập lựa chọn của bạn (0, 1 hoặc 2):";    
    let choice = prompt(menu);

    if (choice !== null) {
        choice = choice.trim();
    }
    switch (choice) {
        case "1": {
            console.log("\n 1. NHẬP VÀ KIỂM CHUẨN MÃ ĐƠN HÀNG");
            currentOrderCode = "";
            isOrderValid = false;

            let rawCode = prompt("Nhập mã đơn hàng:");

            if (rawCode === null || rawCode.trim() === "") {
                console.log("Lỗi: Chưa nhập mã đơn hàng.");
                break;
            }
            let normalizedCode = rawCode.trim().toUpperCase();
            if (normalizedCode.length < 5) {
                console.log("Lỗi: Độ dài mã đơn hàng phải từ 5 ký tự trở lên.");
            } else if (normalizedCode.includes(" ")) {
                console.log("Lỗi: Mã đơn hàng không được chứa khoảng trắng ở giữa.");
            } else {
                currentOrderCode = normalizedCode;
                isOrderValid = true;
                console.log(`Thành công! Đã ghi nhận mã đơn hàng: ${currentOrderCode}`);
            }
            break;
        }  
        case "2": {
            console.log("\n 2. TÍNH TIỀN ĐƠN SÁCH ");

            if (isOrderValid === false) {
                console.log("Lỗi: Bạn chưa có mã đơn hàng hợp lệ. Vui lòng chọn chức năng 1 trước.");
                break;
            }
            let bookCount = 0;
            let pricePerBook = 0;
            let isCancelled = false;           
            while (true) {
                let countInput = prompt("Nhập số lượng sách (số nguyên > 0):");
                if (countInput === null) {
                    isCancelled = true;
                    break;
                }
                bookCount = Number(countInput);
                if (!isNaN(bookCount) && Number.isInteger(bookCount) && bookCount > 0) {
                    break;
                }
                console.log("Dữ liệu không hợp lệ. Số lượng phải là số nguyên lớn hơn 0.");
            }
            if (isCancelled) break;           
            while (true) {
                let priceInput = prompt("Nhập đơn giá mỗi cuốn sách (VNĐ, số nguyên > 0):");
                if (priceInput === null) {
                    isCancelled = true;
                    break;
                }
                pricePerBook = Number(priceInput);
                if (!isNaN(pricePerBook) && Number.isInteger(pricePerBook) && pricePerBook > 0) {
                    break;
                }
                console.log("Dữ liệu không hợp lệ. Đơn giá phải là số nguyên lớn hơn 0.");
            }
            if (isCancelled) break;
            
            let baseCost = bookCount * pricePerBook;
            let discount = 0;
            
            if (bookCount >= 4) {
                discount = baseCost * 0.1;
            }
            let packingFee = Math.round((baseCost - discount) * 0.08);
            let totalPayment = (baseCost - discount) + packingFee;
            totalRevenue += totalPayment;
            totalOrders += 1;           
            console.log("=".repeat(40));
            console.log("          HÓA ĐƠN MUA SÁCH");
            console.log("=".repeat(40));
            console.log(`Mã đơn hàng       : ${currentOrderCode}`);
            console.log(`Số cuốn sách      : ${bookCount}`);
            console.log(`Giá mỗi cuốn      : ${formatMoney(pricePerBook)}`);
            console.log(`Chi phí cơ sở     : ${formatMoney(baseCost)}`);
            console.log(`Tiền giảm giá     : ${formatMoney(discount)}`);
            console.log(`Phí bọc/đóng gói  : ${formatMoney(packingFee)}`);
            console.log(`Tổng thanh toán   : ${formatMoney(totalPayment)}`);
            console.log("=".repeat(40));
            currentOrderCode = "";
            isOrderValid = false;
            break;
        }
        case "3": {
            console.log("Chưa làm xong");
            
            break;
        }
        case "0": {
            console.log("\n" + "=".repeat(50));
            console.log("         BÁO CÁO TỔNG KẾT CA BÁN HÀNG");
            console.log("=".repeat(50));           
            if (totalOrders === 0) {
                console.log("Chưa phát sinh đơn hàng nào trong ca.");
            } else {
                let averageRevenue = Math.round(totalRevenue / totalOrders);
                console.log(`Tổng số đơn hàng đã thanh toán : ${totalOrders} đơn`);
                console.log(`Tổng doanh thu ca bán hàng     : ${formatMoney(totalRevenue)}`);
                console.log(`Doanh thu trung bình mỗi đơn   : ${formatMoney(averageRevenue)}`);
            }               
            console.log("=".repeat(50));
            console.log("Chương trình kết thúc. Chào tạm biệt!");
            isRunning = false;
            break;
        }       
        default: {
            console.log("Lỗi: Lựa chọn không hợp lệ. Vui lòng chỉ nhập 0 , 1 , 2 hoặc 3.");
            break;
        }
    }
}