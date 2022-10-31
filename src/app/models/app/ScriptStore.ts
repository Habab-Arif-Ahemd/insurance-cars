interface Script {
   name: string;
   src: string;
}  

export const ScriptStore: Script[] = [
   { name: 'jspdf', src: '../../../assets/scripts/jspdf.js' },
   { name: 'html2canvas', src: '../../../assets/scripts/html2canvas.js' },
   { name: 'html2pdf', src: '../../../assets/scripts/html2pdf.js' }
];
