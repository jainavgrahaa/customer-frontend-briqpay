import { useServerRender } from '@/_hooks/useServerRender';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const HtmlParser = ({ htmlString }) => {
    const { isServer } = useServerRender()
    return (
        <>
            {!isServer ? <div dangerouslySetInnerHTML={{ __html: htmlString }} /> :
                <ReactQuill
                    value={htmlString}
                    readOnly={true}
                    theme={"bubble"}
                />}
        </>
    );
};

export default HtmlParser;