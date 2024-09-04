export default function Header(): JSX.Element {
    return <>
        <header style={{
            backgroundColor: '#111111',
            borderBottom: '2px solid teal',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0
        }} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center col-span-2">
                {/* Replace the image source with your own logo */}
                <img src="/lpm-logo-black.png" alt="Logo" className="h-26 w-48"/>
            </div>
            <nav className="col-span-10">
                <ul className="flex space-x-4 text-white">

                </ul>
            </nav>
        </header>
    </>
}