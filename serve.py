import http.server, os

os.chdir("/Users/user/Downloads/Claude project")

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(fmt % args)

http.server.HTTPServer(("", 3000), Handler).serve_forever()
