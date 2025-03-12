from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class HelloWorldHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/hello':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'message': 'Hello, World!'}
            self.wfile.write(json.dumps(response).encode())

def run(server_class=HTTPServer, handler_class=HelloWorldHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()