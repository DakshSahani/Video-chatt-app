import Header from './Header'

const MainPageTemplate = ({children})=>{
    return <div className="flex flex-col min-h-screen">
        <Header />
        <div className='bg-slate-900 grow-[1]'>
            {children}
        </div>
    </div>
}

export default MainPageTemplate;