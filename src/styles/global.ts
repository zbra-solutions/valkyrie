import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, border-style, #root {
        min-height: 100%;
    }

    body {
        background: #7159c1;
        -webkit-font-smoothing: antialiased !important;
        color: #333;
    }

    .container {
        display: flex;
        flex-direction: column;

        margin: 70px auto;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 15px;
        background: #fff;
        padding: 30px 50px !important;
    }

    .center {
        justify-content: center;
        align-items: center;
    }

`;
