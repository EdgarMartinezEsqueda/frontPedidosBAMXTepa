/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgClaro: "#F2F2F2",
        bgOscuro1: "#353b48",
        footer: "#1b1f28",
        rojoLogo: "#ed1a3b",
        verdeLogo: "#0db14c",
        amarilloLogo: "#fdb913",
        grisLogo: "#58595b",
        navbarOscuro: "#0D1B2A",
      },
      backgroundImage: {
        happyGirl: "url('https://lh3.googleusercontent.com/fife/ALs6j_FWVMcQgNjQn_EdwYOCG92n65ax0qLwZP80dqzt9xRCIu28gUpk9RH7gYkLvgbomS3I9-AYEk0zJ7D6zba-eZU8WfdAixuwbA5hhCKJKq8kwWhqo4_cMzoQHmWF211Sk-g_Mqc8N2RCg94nmL-QcStdn-3NE4KPIF45bDhmOOTHOecjqBiu-qP-zUiq_lG0n7jsv1QY2jZ3oZqAQBz3xzO5rfC_VYR3FzXvB7DMDYqgcD0IqaHFDno-NOWTvOAupKFGtyFpyXJ3Wgo9LhQeUng1a509p7i6BilehaESJVB8LqzB_oCVqVhf4AYUJPk0_HLW7gfI38v7z0zMoA852nvVFuIe1KUuD8XVuA9RjMtpShyxpv8iZ0YkE3xZPsYs7nFl8scjn8zEF6JQX0C84fGkNmchw8RgaL7pr_nN_k_k4veZPBFOThmevIUNCbZEUzILkNkAFMCtfLzfQ2cZUGgKclaVeway5t_LVakeKGbfrjQ5ry9M7-s2SXYVebVWavsHRUU3Low77q8dBkPM3LRr4B_o_RklaXYO3Y0I6u-XQ7XBy6XcF0F-tzouPe1-P71s2zsIR2BYuxU33wW5gJSId_Wg7giH77nhR1X4ZUOXoNI_fqAWEa0W3s9dq9jubm-C0MaH565LdbSnYCFZrzfzT99quKhDSeGy5ZcXX_AQe_7iIJCqTTKiJWK56K_OzT9Rp_23L46CNbVwpQaQI4Yq9IPvorHzFqEVxdr81pL0D7SRRJYP0Bt2vpEALvPMf4mca9GQBTzF4sE516sQNXQLQDa3hqiD0vN-fTAySVBd5Gm6iphtF1RvVZcU87ewRfemUgJVoU4v_ir1vnnmYK4R-KxkhKuK59vgt4lYGtAfvxzJw6air6vVfA7clXKelPCewzpOhbEpzrEvhQKtfBPOb75grc_mNby1RAgkhDARzU_YsJ9m2sN0325e6Crbf8mXM2bM1FdZBh4lAkKFdLp4oKAHU8nxa-UO5lNiUM_caDl1Eyket2TXvc9s_7QREL1hnTTp6nHnRqmfT72bGajQfa9P8u8J5QL8Fg1_DfB2Lw5ToVQHzfJRrdX1qgO_d5-UAOf6fWwJ2s3f-XW82fBMNnYMU24ksfRrEsBfYw2P6QYzhPLr9TmlBpKV84yIbxcJjqZ9VlN-JovQH73cbWOAxL60LNSlxQF_IpjT93WPgIr_U1V_IpEsiF3cCSYMG8CIvhVaHu6vdUyP0NrNtRat3I1POvvnXFDEfXxp-yyzCo8rVmdXI5_JOUABOlbQuWG9n5leEESSvcoUs4NhcwBpLIuGPIBnSPyZyPx2oIv-3bM7wI9O7de-BYDuaKduriqt1nxFAk5Iv6NGdYmjoH8W0uTf8nFe8WfE7vHmNK27AA0AZzxt8SGeA2VtVCEIunDf5jRdKcnWHM6F-cC3mwPUeeIU5vTEJphKuKgBKM0rs-PUnT6eqmhsjQOBSgp58PaUqkith28wEhZ_OpYULLiv4VuPncwUmV4XVnU0Ge4CFDOQ65wTNPhh5gTBK3JDFQfBooHzLZKwupNQqaxaCe-gYf13-v8dXroofyI8lW7hxa_XDIC1fq4xP8F7IsgaJWTWLKhm_qTID6vE15iASgIVI7U-o2H0rdkiCWHEygcYfiQXQFbJ6Ts')",
        equipoBAMX: "url('https://lh3.googleusercontent.com/fife/ALs6j_FzrP-3iqsu3f_UJzNLzeDYLvH6Ni8yHQd2nTd606_TqUHcys1cC4fk2TuMz0kt0GVf4QvB_jGY7Xg7nswSJATAfZ5WvvQIeAVHyrf3FTaB0cFgBs8ELg5AnF_gNgXzxYfeyU3gy0lfuIon0Kk4a5_4VdMME_JZW1wr_MjgueWufpx2iJZoeLf6LGT7B1Qrrjil1okBcSOdQJcWR6yBySe81oXB2x0hxbU29LxKbLivnbT_OrODo74-4X1jxegfxxeUj3tQUgjen19OyXP7WqN8Ry5p4Wz4PCCyrbw7obfouv5XmISX1JenUxS2ujAvQ5c_cA1TpN2EuiYbOVemVMJ_O4H8EbJ2y7bD5SRrLdxPqxwbBHfrrtXYvy_XGPMJQDKVYf7hIMfzVJq5rDRytHht62hqjl_Vb1BHl0hXFkxQ6YU-yQHb6aOvfy_sf88AFA3SwxIAxoGhb3m1Z0QR7sfvnS3XH-cksl0ut6yk_s5iWay96lxJK4OnvrkzUEk0AT7_7IFFpLHBP6R-EHSZ94uSRrEA_swF1rzHhXgP_0pqQTXyWePp44ML91T4xper4ZCZ6nlKEXGpqg5tHqybnDWPDXty3J4C5w6L4ypD1RI6l5AUa4zl_VMnKhrRKrOXQ-oPskaGcSKQIVEOfCBSGbCy1IgRCxgwruf2qxAgLVsP-3rNS9fZsiaZ3doKtP-QW1fnxcrdatE-ClayjUI68Dt_MJOQ0EESaShzIEMfHywO2tvPnF-GR0ld8sXHV6fjZP2NatA3GFt9UOW4-DjdrRTBFQlwkpFkKFV2scOOBevZlIC6EE5j9WpI9DiE0r_nUTBRHdsXkEkKIwbSFBicJjdEkSXYnzOWHQ08BpvI1vXxj89cEIvAuTvi954cMXzRuj5mf6SqCPC9bLhJutHLuryRf7rEXOmTzhJbZ2PTASlnwfrHwGyqkwF44xFTxrNcfxS1_5QCucYElbAs5uFd7gbAgcLt9BXrXAG5vAhdvfYNS4VazmWrXiy5CoTEj2NTpxvjf3PAZVFy9yQoZa6gvtO17Q40VtHvyRKogzUu17F-A1m6tEUremOr3a7NpfwlcBN2LTu3nEuz1vowZo_L3lpISZZln5-okbI1eGfTYlCfXLoQLXHHcZ7Su-8G_5nBrWAUW-xLatl77xnDra7ErMZib7JUqWGeD8XD7u-Aiht8YAFF5NZEmnn84v0cnluEfNiNZCBTpzRN_juRqFZvMf5PMx8hiFPVEjXfm71REXQ_7lha16mYTz8cxhCkBubQtV8xTjeTSnz8lzdEXZRWi-3Sneet8wFcAw3QUYRVRMdTSf3L3ibNbHNy5hZLD5PPQu1jZBZmdBnQoUXD2pHOzt1gVPDyhyhxBi2l-XBJS_buP12vzaquA-o_C-UrtpoDJLV8CcKK2TrPT4m7T-XVkVyfGCQvlf6B3sCIb2vcN-vpHGxryoxLm2LAs4p5NfWxmWs5PkshcT-RDeMoJYjoqK3satxIpqTTcM_dulOuCGXiy1HcbIgSu30VYTRgvMV-_kFe7mPsuNtHOL8zRKh8WJgYjGo00waiNUjH7yZ3J0zQP-B7i2Z3f-rQNLZqHTIpqBwh37fFnJujpce64vQEqjEh6HNOQjocLL6cKaxEld7l7YOfxSll6_BRhYQKSYaOWZuuZ-WztP4JEYhl85yjd8zgJ0eNk4E3uXtas9__qNjUt2H1OpWkETk10gS4=w2000-h3252')",
      },
      fontFamily: {
        omnes: ['Omnes', 'sans-serif'], // Usa "sans-serif" como fallback
        locator: ['Locator', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
  darkMode: "class",
}