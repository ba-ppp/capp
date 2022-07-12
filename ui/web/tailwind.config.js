/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    200: '#F4F4F2',
                    400: '#E8E8E8',
                    600: '#BBBFCA',
                    800: '#495464',
                },
                main: {
                    200: '#DBDFFD',
                    400: '#9BA3EB',
                    600: '#646FD4',
                    800: '#242F9B',
                },
                mark: {
                    200: '#53BF9D',
                    400: '#F94C66',
                    600: '#BD4291',
                    800: '#FFC54D',
                },
            }
        },
        plugins: [],
    },
}
