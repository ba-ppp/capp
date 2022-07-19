import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isEnglish: true as boolean,
    textContent: {
        lang: ["Language", "Ngôn ngữ"],
        help: ["Help", "Giúp"],
        about: ["About us", "Giới thiệu"],
        start: ["Get started", "Bắt đầu"],
        intro: ["A PLATFORM BUILT FOR", "MỘT NỀN TẢNG SINH"],
        appName: ["IMAGE CAPTION", "CÂU MÔ TẢ CHO ẢNH"],
        descri: [
            "By using combination Inception-V3 and LSTM, we built a platform to generate caption for each image",
            "Kết hợp hai mô hình Inception-V3 và LSTM, chúng tôi xây dựng một nền tảng sinh câu mô tả cho từng bức ảnh",
        ],
        startFree: ["Start for free", "Dùng thử miễn phí"],
        nologin: ["No login needed", "Không cần đăng nhập"],
        serTitle: ["Our Services", "Có Các Chức Năng"],
        serCap: ["Caption", "Mô tả"],
        serCDes: ["Caption your image.", "Sinh câu mô tả cho ảnh của bạn."],
        serDown: ["Download", "Tải"],
        serDDes: ["Download image and caption.", "Tải xuống ảnh và câu mô tả."],
        more: ["Learn more", "Tìm hiểu thêm"],
        supportLangTit: ["Supported Languages", "Ngôn Ngữ Hỗ Trợ"],
        supportLangDes: ["Languages we support", "Các ngôn ngữ được hỗ trợ"],
        langViDes: ["VietNam", "Việt Nam"],
        langEnDes: ["English", "Tiếng Anh"],
    },
};

const TextContentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        changeLang: (
            state: { isEnglish: boolean },
            { payload }: PayloadAction<boolean>
        ) => {
            state.isEnglish = payload;
        },
    },
});
export const { changeLang } = TextContentSlice.actions;

export default TextContentSlice.reducer;
