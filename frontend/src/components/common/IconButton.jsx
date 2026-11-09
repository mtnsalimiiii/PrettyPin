const IconButton = ({ children, onClick, label, badgeCount }) => {
    return (
        <div className="group relative">
            <button
                type="button"
                onClick={onClick}
                className="
          flex h-10 w-10 items-center justify-center
          rounded-full border border-gray-500 bg-white
          transition-all duration-200
          hover:border-pink-500 hover:text-pink-500 hover:shadow-md
          sm:h-11 sm:w-11
        "
            >
                {children}
            </button>

            {badgeCount > 0 && (
                <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                    {badgeCount > 99 ? "99+" : badgeCount}
                </span>
            )}

            {label && (
                <span
                    className="
            pointer-events-none absolute right-1/2 top-full z-20 mt-2 translate-x-1/2
            whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1 text-xs text-white
            opacity-0 transition-opacity duration-200
            hidden group-hover:opacity-100 sm:block
          "
                >
                    {label}
                </span>
            )}
        </div>
    );
};

export default IconButton;