import { useSelector } from 'react-redux';
import './loader.module.css';

const Loading = ({ children }) => {
    const isLoading = useSelector(state => state?.auth.isLoading);

    return (
        <>
            {children}
        </>
    );
}

export default Loading;