import React from 'react'

export default function Footer() {
  return (
    <div>
        <div className="text-sm text-center p-2 border-t">
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwoordle-afr.netlify.app%2F&amp;src=sdkpreparse"
           target="_blank">
          <i className="fa-brands fa-facebook-f p-1"></i></a>| 
          <a href="https://twitter.com/intent/tweet" target="_blank"><i className="fa-brands fa-twitter p-1"></i></a>| 
          <a href="https://www.instagram.com/?hl=en" target="_blank"><i className="fa-brands fa-instagram-square p-1"></i></a>|
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://woordle-afr.netlify.app" target="_blank"><i className="fa-brands fa-linkedin-in p-1"></i></a>
          </div>
        <div className="text-sm text-center bg-slate-200 p-2"><a href="mailto:milesmedia9@gmail.com">Contact</a> <i className="fa-brands fa-react"></i> {new Date().getFullYear()}</div>
    </div>
  )
}
