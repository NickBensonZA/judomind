import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-noto font-bold mb-4">JudoMind</h3>
            <p className="text-gray-300">Mental preparation and mindfulness techniques for judokas at all levels.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-accent transition duration-300">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/affirmations">
                  <a className="text-gray-300 hover:text-accent transition duration-300">Affirmations</a>
                </Link>
              </li>
              <li>
                <Link href="/breathing">
                  <a className="text-gray-300 hover:text-accent transition duration-300">Breathing</a>
                </Link>
              </li>
              <li>
                <Link href="/sessions">
                  <a className="text-gray-300 hover:text-accent transition duration-300">Sessions</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-accent transition duration-300">About Judo</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition duration-300">Mental Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition duration-300">Competition Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent transition duration-300">Grading Preparation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-accent transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM17.3 9C17.3 9 16.3 9 15.7 9C15.1 9 14.9 9.5 14.9 10.1V11H17.3L17 13.3H14.9V19H12.5V13.3H10.7V11H12.5V9.5C12.5 7.8 13.3 6.5 15.3 6.5C16.4 6.5 17.3 6.7 17.3 6.7V9Z"></path></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM8.5 9.5C8.5 10.328 7.829 11 7 11C6.172 11 5.5 10.328 5.5 9.5C5.5 8.672 6.172 8 7 8C7.829 8 8.5 8.672 8.5 9.5ZM8.5 12V18H5.5V12H8.5ZM12.5 18H9.5V12H12.5V13.543C12.5 13.543 13.5 12 14.5 12C16.5 12 17.5 13 17.5 15.5V18H14.5V15.5C14.5 15.5 14.5 14 13.25 14C12.5 14 12.5 15.5 12.5 15.5V18Z"></path></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM18.5 8.719C18.057 9.139 17.557 9.493 17.014 9.774C16.997 9.871 16.997 9.97 16.997 10.068C16.997 14.061 13.941 18.702 8.384 18.702C6.62 18.702 4.977 18.18 3.567 17.279C3.805 17.309 4.044 17.324 4.284 17.324C5.778 17.324 7.143 16.817 8.23 15.968C6.824 15.941 5.638 14.994 5.227 13.676C5.415 13.707 5.603 13.722 5.793 13.722C6.055 13.722 6.315 13.691 6.559 13.631C5.092 13.334 3.966 12.029 3.966 10.447C3.966 10.432 3.966 10.418 3.966 10.402C4.396 10.641 4.886 10.787 5.407 10.803C4.526 10.203 3.951 9.195 3.951 8.052C3.951 7.438 4.109 6.863 4.388 6.364C5.968 8.322 8.304 9.625 10.945 9.761C10.893 9.525 10.866 9.278 10.866 9.032C10.866 7.266 12.293 5.837 14.057 5.837C14.976 5.837 15.806 6.24 16.381 6.881C17.096 6.742 17.772 6.48 18.382 6.116C18.139 6.851 17.634 7.467 16.977 7.851C17.617 7.776 18.24 7.612 18.824 7.354C18.382 7.984 17.825 8.538 17.188 8.987C17.194 8.9 17.198 8.812 17.198 8.723C17.198 8.389 17.188 8.055 17.169 7.721C17.161 7.597 17.26 7.488 17.384 7.488C17.513 7.488 17.611 7.586 17.611 7.714C17.611 7.714 17.623 7.973 17.623 8.191C17.623 8.409 17.623 8.567 17.623 8.567C17.623 8.661 17.707 8.736 17.799 8.716C18.103 8.649 18.389 8.52 18.614 8.351C18.704 8.284 18.825 8.328 18.856 8.437C18.878 8.514 18.845 8.595 18.784 8.64C18.693 8.708 18.598 8.715 18.5 8.719Z"></path></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM16.962 10.224C16.962 10.274 16.962 10.325 16.962 10.374C16.962 13.526 14.511 17.174 10.088 17.174C8.705 17.174 7.416 16.747 6.342 16.013C6.546 16.041 6.758 16.055 6.967 16.055C8.114 16.055 9.169 15.643 10.007 14.95C8.939 14.929 8.028 14.203 7.729 13.202C7.888 13.233 8.054 13.252 8.226 13.252C8.464 13.252 8.695 13.216 8.912 13.147C7.794 12.918 6.965 11.922 6.965 10.736C6.965 10.723 6.965 10.712 6.965 10.698C7.287 10.879 7.654 10.989 8.045 11.003C7.393 10.566 6.97 9.832 6.97 8.996C6.97 8.544 7.089 8.121 7.297 7.756C8.501 9.262 10.309 10.24 12.351 10.35C12.303 10.173 12.277 9.986 12.277 9.794C12.277 8.415 13.391 7.298 14.769 7.298C15.493 7.298 16.146 7.605 16.602 8.101C17.173 7.982 17.713 7.777 18.205 7.498C18.023 8.082 17.633 8.566 17.122 8.865C17.622 8.807 18.097 8.681 18.544 8.493C18.206 8.989 17.77 9.425 17.267 9.777C17.274 9.927 17.277 10.075 17.277 10.224C17.277 10.224 16.962 10.224 16.962 10.224Z"></path></svg>
              </a>
            </div>
            <p className="text-gray-300">Subscribe to our newsletter for training tips and updates.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JudoMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
