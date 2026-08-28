import http.server
import socketserver
import os
import sys

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    # Ensure UTF-8 output if possible
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)

    print("=" * 60)
    print(" SAMPHA RA - POS & Storefront Web Server")
    print("=" * 60)
    print(f" Serving at: http://localhost:{PORT}")
    print(" Opening your web browser automatically...")
    print(" Press Ctrl+C to stop the server.")
    print("=" * 60)

    try:
        import webbrowser
        webbrowser.open(f"http://localhost:{PORT}")
    except Exception:
        pass

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
