const email_service = module.exports;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: 'johnwilliamreyes1@gmail.com',
    pass: 'voiwgdlhmiqxbddy',
  },
});

email_service.send_email = async (notification) => {
  const { email, subject, body } = notification;
  const mailOptions = {
    from: 'jwreyesg@uqvirtual.edu.co',
    to: email,
    subject: subject,
    html: `${body}`,
  };
  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      return { error: false, message: 'Email Send Successfully' };
    })
    .catch((error) => {
      return { error: true, message: error };
    });
};

email_service.get_template = async (data) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Goopcar Bienvenida</title>
      <style type="text/css">
        /* ----- Custom Font Import ----- */
        @import url(https://fonts.googleapis.com/css?family=Epilogue:400,700&subset=latin,latin-ext);

        /* ----- Text Styles ----- */
        table {
          font-family: 'Epilogue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }

        @media only screen and (max-width: 700px) {
          /* ----- Base styles ----- */
          .full-width-container {
            padding: 0 !important;
          }

          .container {
            width: 100% !important;
          }

          /* ----- Header ----- */
          .header td {
            padding: 30px 15px 30px 15px !important;
          }

          /* ----- Projects list ----- */
          .projects-list {
            display: block !important;
          }

          .projects-list tr {
            display: block !important;
          }

          .projects-list td {
            display: block !important;
          }

          .projects-list tbody {
            display: block !important;
          }

          .projects-list img {
            margin: 0 auto 25px auto;
          }

          /* ----- Half block ----- */
          .half-block {
            display: block !important;
          }

          .half-block tr {
            display: block !important;
          }

          .half-block td {
            display: block !important;
          }

          .half-block__image {
            width: 100% !important;
            background-size: cover;
          }

          .half-block__content {
            width: 100% !important;
            box-sizing: border-box;
            padding: 25px 15px 25px 15px !important;
          }

          /* ----- Hero subheader ----- */
          .hero-subheader__title {
            padding: 80px 15px 15px 15px !important;
            font-size: 35px !important;
          }

          .hero-subheader__content {
            padding: 0 15px 90px 15px !important;
          }

          /* ----- Title block ----- */
          .title-block {
            padding: 0 15px 0 15px;
          }

          /* ----- Paragraph block ----- */
          .paragraph-block__content {
            padding: 25px 15px 18px 15px !important;
          }

          /* ----- Info bullets ----- */
          .info-bullets {
            display: block !important;
          }

          .info-bullets tr {
            display: block !important;
          }

          .info-bullets td {
            display: block !important;
          }

          .info-bullets tbody {
            display: block;
          }

          .info-bullets__icon {
            text-align: center;
            padding: 0 0 15px 0 !important;
          }

          .info-bullets__content {
            text-align: center;
          }

          .info-bullets__block {
            padding: 25px !important;
          }

          /* ----- CTA block ----- */
          .cta-block__title {
            padding: 35px 15px 0 15px !important;
          }

          .cta-block__content {
            padding: 20px 15px 27px 15px !important;
          }

          .cta-block__button {
            padding: 0 15px 0 15px !important;
          }
        }
      </style>

      <!--[if gte mso 9
        ]><xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml><!
      [endif]-->
    </head>

    <body style="padding: 0; margin: 0" bgcolor="#eeeeee">
      <span
        style="
          color: transparent !important;
          overflow: hidden !important;
          display: none !important;
          line-height: 0px !important;
          height: 0 !important;
          opacity: 0 !important;
          visibility: hidden !important;
          width: 0 !important;
          mso-hide: all;
        "
        >This is your preheader text for this email (Read more about email
        preheaders here - https://goo.gl/e60hyK)</span
      >

      <!-- / Full width container -->
      <table
        class="full-width-container"
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        bgcolor="#eeeeee"
        style="width: 100%; height: 100%; padding: 30px 0 30px 0"
      >
        <tr>
          <td align="center" valign="top">
            <!-- / 700px container -->
                  <!-- / Hero subheader -->
                  <table
                    class="container hero-subheader"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="620"
                    style="width: 620px"
                  >
                    <tr>
                      <td
                        class="hero-subheader__title"
                        style="
                          font-size: 43px;
                          font-weight: bold;
                          padding: 80px 0 15px 0;
                        "
                        align="left"
                      >
                        ¡Hola ${data.name}!
                      </td>
                    </tr>
                  </table>
                  <!-- /// Hero subheader -->

                  <!-- / Hero image -->
                  <table
                    class="container hero-subheader"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="620"
                    style="width: 620px"
                  >
                    <tr>
                      <td style="padding: 16px 0 15px 0">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/delivery-udemy-mysql-759e1.appspot.com/o/logo_manantial.png?alt=media&token=6d176e3b-8091-4adf-b613-fa930c33d958&_gl=1*1pcihw6*_ga*MjA2MjYwNDA5MS4xNjc3MjY5MDM2*_ga_CW55HF8NVT*MTY5NjEzNTQ5OS4xOS4xLjE2OTYxMzU1MzkuMjAuMC4w"
                          width="100%"
                          border="0"
                          style="display: block"
                        />
                      </td>
                    </tr>
                  </table>
                  <!-- /// Hero image -->

                  <!-- / Title -->
                  <table
                    class="container title-block"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tr>
                      <td align="center" valign="top">
                        <table
                          class="container"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="620"
                          style="width: 620px"
                        >
                          <tr>
                            <td
                              style="
                                border-bottom: solid 1px #eeeeee;
                                padding: 35px 0 18px 0;
                                font-size: 35px;
                              "
                              align="left"
                            >
                              Se ha reestablecido tu contraseña
                            </td>
                          </tr>
                          
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!-- /// Title -->

                  <!-- / Paragraph -->
                  <table
                    class="container paragraph-block"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                  >
                    <tr>
                      <td align="center" valign="top">
                        <table
                          class="container"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="620"
                          style="width: 620px"
                        >
                          <tr>
                            <td
                              class="paragraph-block__content"
                              style="
                                padding: 25px 0 18px 0;
                                font-size: 30px;
                                line-height: 27px;
                                color: black;
                              "
                              align="left"
                            >
                              <b>Nueva contraseña : </b> ${data.password} 
                            </td>
                          </tr>
                          <tr>
                      <td align="center" valign="top">
                        <table
                          class="container"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="620"
                          style="width: 620px"
                        >
                          <tr>
                            <td
                              class="paragraph-block__content"
                              style="
                                padding: 25px 0 18px 0;
                                font-size: 25px;
                                line-height: 27px;
                                color: blue;
                              "
                              align="left"
                            >
                              <b>¡No olvides cambiarla!</b> 
                            </td>
                          </tr>
                          
                          
                         
                          
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!-- /// Paragraph -->

                      </td>
                    </tr>
                  </table>
                  <!-- /// CTA Block -->

                  <!-- / Divider -->
                  <table
                    class="container"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="padding-top: 25px"
                    align="center"
                  >
                    <tr>
                      <td align="center">
                        <table
                          class="container"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="620"
                          align="center"
                          style="border-bottom: solid 1px #eeeeee; width: 620px"
                        >
                          <tr>
                            <td align="center">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!-- /// Divider -->

   
                      </td>
                    </tr>
                  </table>

                  <!-- / Footer -->
                 
                      </td>
                    </tr>
                  </table>
                  <!-- /// Footer -->
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
