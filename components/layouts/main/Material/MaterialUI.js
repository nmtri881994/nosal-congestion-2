import Header from './components/Header';
import LeftNavigator from './components/LeftNavigator';

const MaterialUI = (props) => {
    return <>
        <div className="page-container-1">
            <Header />
            <LeftNavigator />
            {props.children}
        </div>
        <style jsx>{`
            .page-container-1 {
                display: flex;
                flex-direction: column;
            }
        `}</style>
    </>;
};

export default MaterialUI;