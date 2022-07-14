import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isEnglish: true as boolean,
    textContent: {
        lang: ["Language", "Ngôn ngữ"]
        ,
        help: ["Help", "Giúp"],
        about: ["About us", "Giới thiệu"],
        start: ["Get started", "Bắt đầu"],
        intro: ["A platform built for image caption", "Một nền tảng sinh câu mô tả cho ảnh"],
        descri: ["By using combination Inception-V3 and LSTM, we built a platform to generate caption for each image",
            "Kết hợp hai mô hình Inception-V3 và LSTM, chúng tôi xây dựng một nền tảng sinh câu mô tả cho từng bức ảnh"],
        startFree: ["Start for free", "Dùng thử miễn phí"],
        nologin: ["No login needed", "Không cần đăng nhập"]
    },
}


const TextContentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        changeLang: (state, { payload }: PayloadAction<boolean>) => {
            state.isEnglish = payload;
        },
    },
});
export const { changeLang } =
    TextContentSlice.actions;

export default TextContentSlice.reducer;
