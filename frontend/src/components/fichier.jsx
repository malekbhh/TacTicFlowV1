import React from "react";

function fichier() {
  const emailRef = createRef();
  const passwordRef = createRef();
  return (
    <div>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-80 border border-gray-300 text-gray-500 rounded-xl px-5 py-2"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        {message && (
          <div className="text-red-500 rounded-lg flex items-center justify-between">
            <button onClick={() => setMessage(null)}>
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2m-2-2l-2-2m2 2l2 2m-2-2l-2-2m2 2l2 2m-2-2l-2-2"
                />
              </svg>
            </button>
            <p className="font-medium text-sm">{message}</p>
          </div>
        )}
        <button className="h-8 w-24 bg-[#212177] mb-1 text-white items-center px-4 pb-1 justify-center font-medium mt-4 rounded-xl">
          Send Reset Email
        </button>
      </form>
    </div>
  );
}

export default fichier;
