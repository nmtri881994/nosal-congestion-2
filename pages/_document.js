import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <style>{`
                        html {
                            background-color: #e8e9ea;
                        }


                        body { 
                            margin: 0px 10px;
                        } 

                        a {
                            text-decoration: none;
                            color: black;
                        }

                        .noselect {
                            -webkit-touch-callout: none; /* iOS Safari */
                              -webkit-user-select: none; /* Safari */
                               -khtml-user-select: none; /* Konqueror HTML */
                                 -moz-user-select: none; /* Firefox */
                                  -ms-user-select: none; /* Internet Explorer/Edge */
                                      user-select: none; /* Non-prefixed version, currently
                                                            supported by Chrome and Opera */
                        }

                        
                        .array-item {
                            padding: 5px 5px;
                            border-radius: 5px;

                            background-color: white;
                            
                            margin-top: 5px;
                            margin-right: 5px;
                        }

                        .cursor-pointer{
                            cursor: pointer;
                        }

                        .array-item:not(:first-of-type) {
                            
                        }

                        .hover-blue{
                            transition: background-color 0.2s, color 0.2s;
                        }

                        .hover-blue:hover{
                            background-color: #2196F3;
                            color: white !important;
                        }

                        .rt-td{
                            white-space: pre-line !important;
                        }

                        .multi-option-containter-1 {
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;

                            margin-top: -5px;
                            margin-right: -5px;
                        }

                        .blink-text {
                            animation: blinker 3s linear;
                        }
                        
                        @keyframes blinker {
                            50% {
                                opacity: 0;
                            }
                        }

                        /* custom! */`}</style>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
                    <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css"></link>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"></link>
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;