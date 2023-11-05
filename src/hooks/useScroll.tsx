
import { useEffect, useState, useCallback } from 'react';

enum Ancors {
    top = 'top',
    bottom = 'botton'
}

type UseScroll = {
    isVisible: boolean
    ancor: string
    count: number
    targetElement: HTMLElement
}
export default function useScroll({ isVisible = false, ancor = 'bottom', count, targetElement }: UseScroll) {
    const [visible, setVisible] = useState(isVisible);
   
    const progressBar = useCallback(() => {
        if (targetElement) {
            const elementScroll = targetElement.scrollTop;
            const elementHeight = targetElement.clientHeight;
            const elementScrollTop = targetElement.scrollHeight - elementHeight - elementScroll;

            if (ancor === 'bottom' && elementScrollTop <= count) {
                setVisible(true);
            } else if (ancor === 'top' && elementScroll <= count) {
                setVisible(true);
            } else {
                setVisible(false);
            } 
        }
    }, [count, targetElement, ancor]);

    useEffect(() => {
        if (targetElement) {
            targetElement.addEventListener('scroll', progressBar);
            return () => targetElement.removeEventListener('scroll', progressBar);
        }
    }, [progressBar, targetElement]);

    return [visible];
}

// export default function useScroll({ isVisible = false, ancor = 'bottom', count }: UseScroll) {
//     // const [progress, setProgress] = useState(0);
//     const [visible, setVisible] = useState(isVisible);
   
//     const progressBar = useCallback(() => {
//         let windowScroll = document.documentElement.scrollTop;
//         // let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//         // if(windowScroll >= windowHeight || windowScroll > count) {
//         if(windowScroll >= count) {
//             setVisible(true);
//         } else {
//             setVisible(false);
//         }
//         // let per = windowScroll / windowHeight * 100;
//         // setProgress(per)
//       }, [])

//       useEffect(() =>{
//         window.addEventListener('scroll', progressBar)
//         return () => window.removeEventListener('scroll', progressBar)
//       }, [progressBar])

//     return [visible]
// }
