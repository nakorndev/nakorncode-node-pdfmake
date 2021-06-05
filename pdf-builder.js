const fs = require('fs')
const path = require('path')
const PdfPrinter = require('pdfmake')

const printer = new PdfPrinter({
  Prompt: {
    normal: path.resolve(__dirname, './fonts/Prompt-Regular.ttf'),
    bold: path.resolve(__dirname, './fonts/Prompt-Bold.ttf')
  }
})

const pdf = printer.createPdfKitDocument({
  // pageOrientation: 'landscape',
  content: [
    'Hello, world!',
    { text: 'สวัสดีชาวโลก!', margin: [0, 10, 0, 0] },
    // css margin: top, right, bottom, left
    // pdfmake margin: left, top, right, bottom
    { text: 'Bold', bold: true },
    { text: 'Center', alignment: 'center' },
    { text: 'Font 16', style: 'bigRedFont' },
    {
      ul: [
        'Item 1',
        'Item 2',
        { text: 'Item 3', bold: true }
      ]
    },
    {
      table: {
        widths: ['*', 'auto', 'auto'],
        body: [
          [ 'Name', 'Age', 'Status' ],
          [ 'John Doe', '18', { text: 'ok', rowSpan: 2 } ],
          [ 'Joe Dan', '21' ],
          [ 'Jane Dee', '19', '-' ]
        ]
      }
    }
  ],
  defaultStyle: {
    font: 'Prompt',
    fontSize: 10
  },
  styles: {
    bigRedFont: {
      fontSize: 16,
      color: '#ff0000'
    }
  }
})

const writer = fs.createWriteStream(path.resolve(__dirname, './pdf-output.pdf'))
pdf.pipe(writer)
pdf.end()
