from flask import Flask, request, jsonify
from flask_cors import CORS
from io import BytesIO
from pdf2image import convert_from_bytes
import pytesseract
import os

app = Flask(__name__)
CORS(app)

TEXT_FILES_FOLDER = 'extracted_texts'
os.makedirs(TEXT_FILES_FOLDER, exist_ok=True)

PDF_FILES_FOLDER = os.path.join('..', 'server', 'src', 'main', 'resources', 'public', 'pdfs')

@app.route('/receive_pdf', methods=['POST'])
def receive_pdf():
    data = request.json
    pdf_path = data.get('url')
    title = data.get('title')

    if not pdf_path:
        return jsonify({'status': 'error', 'message': 'Caminho do PDF não fornecido'})
    
    full_pdf_path = os.path.join(PDF_FILES_FOLDER, pdf_path)

    if not os.path.isfile(full_pdf_path):
        return jsonify({'status': 'error', 'message': 'Arquivo PDF não encontrado'})

    try:
        with open(full_pdf_path, 'rb') as pdf_file:
            pdf_bytes = pdf_file.read()

        pages = convert_from_bytes(pdf_bytes, first_page=1, last_page=1)
        if not pages:
            return jsonify({'status': 'error', 'message': 'Erro ao converter PDF para imagem'})

        extracted_text = pytesseract.image_to_string(pages[0])

        text_file_path = os.path.join(TEXT_FILES_FOLDER, 'extracted_text.txt')
        with open(text_file_path, 'w', encoding='utf-8') as text_file:
            text_file.write(extracted_text)
        
        if title in extracted_text:
            return jsonify({'status': 'success', 'text': extracted_text})
        else:
            return jsonify({'status': 'error', 'message': 'Título não encontrado no PDF'})

    except Exception as e:
        return jsonify({'status': 'error', 'message': 'Erro ao processar PDF', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)