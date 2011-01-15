import wsgiref.handlers

import os
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp

class index(webapp.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'main.html')
    self.response.out.write(template.render(path, {}))

application = webapp.WSGIApplication([
  ('/', index),
], debug=False)


def main():
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
