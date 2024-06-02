import React, { useState } from 'react';

const FIFOPageReplacement = () => {
    const [step, setStep] = useState(0);
    const [numPages, setNumPages] = useState('');
    const [pagesList, setPagesList] = useState('');
    const [pageSeq, setPageSeq] = useState('');
    const [numFrames, setNumFrames] = useState('');
    const [error, setError] = useState('');
    const [output, setOutput] = useState('');
    const [frameList, setFrameList] = useState([]);
    const [pageFault, setPageFault] = useState('');

    const handleNext = () => {
        setError('');
        switch (step) {
            case 0:
                const numPagesInt = parseInt(numPages);
                if (isNaN(numPagesInt) || numPagesInt <= 0) {
                    setError('Please enter a valid number of pages.');
                    return;
                }
                setStep(step + 1);
                break;
            case 1:
                const pagesArray = pagesList.split(' ').map(page => page.trim());
                if (pagesArray.length !== parseInt(numPages)) {
                    setError('Number of pages does not match the provided list.');
                    return;
                }
                setStep(step + 1);
                break;
            case 2:
                const sequenceArray = pageSeq.split(', ').map(page => page.trim());
                setStep(step + 1);
                startFIFO(sequenceArray);
                break;
            case 3:
                const numFramesInt = parseInt(numFrames);
                if (isNaN(numFramesInt) || numFramesInt <= 0) {
                    setError('Please enter a valid number of frames.');
                    return;
                }
                // Now you can perform FIFO page replacement algorithm with sequenceArray and numFramesInt
                // Replace the console.log with your actual implementation
                console.log('Starting FIFO Page Replacement with:', sequenceArray, 'and', numFramesInt, 'frames');
                break;
            default:
                break;
        }
    };

    const startFIFO = (sequenceArray) => {
        let faultCount = 0;
        let successCount = 0;
        let pageFaultStr = '';

        const pageList = pagesList.split(' ').map(page => page.trim());
        const numFramesInt = parseInt(numFrames);
        const frames = Array.from({ length: numFramesInt }, () => []);

        let isLeft = true;

        for (let i = 0; i < sequenceArray.length; i++) {
            let currPage = sequenceArray[i];

            let frame1 = frames[0];
            let frame2 = frames[1];

            if (frame1.length === 0) {
                frame1.push(currPage);
                frame2.push(' ');

                isLeft = false;

                faultCount++;
                pageFaultStr += '* ';
            } else if (frame2[frame2.length - 1] === ' ') {
                frame1.push(frame1[frame1.length - 1]);
                frame2.push(currPage);

                faultCount++;
                pageFaultStr += '* ';
            } else if (frame1.length !== 0 && frame2.length !== 0) {
                if (frame1[frame1.length - 1] === currPage || frame2[frame2.length - 1] === currPage) {
                    successCount++;
                    pageFaultStr += '  ';
                } else {
                    if (frame1[frame1.length - 1] !== currPage) {
                        frame1.push(currPage);
                        frame2.push(frame2[frame2.length - 1]);
                    } else {
                        frame1.push(frame1[frame1.length - 1]);
                        frame2.push(currPage);
                    }
                    faultCount++;
                    pageFaultStr += '* ';
                }
            }
        }

        setOutput({
            frames: frames.map((frame, index) => `F${index + 1}: ${frame.join(' ')}`),
            pageFaultStr: pageFaultStr,
            successCount: successCount,
            faultCount: faultCount
        });
    };

    const renderInput = () => {
        switch (step) {
            case 0:
                return (
                    <label>
                        Number of pages:
                        <input type="number" value={numPages} onChange={(e) => setNumPages(e.target.value)} />
                    </label>
                );
            case 1:
                return (
                    <label>
                        List of pages (space-separated):
                        <input type="text" value={pagesList} onChange={(e) => setPagesList(e.target.value)} />
                    </label>
                );
            case 2:
                return (
                    <label>
                        Page sequence (comma-separated):
                        <input type="text" value={pageSeq} onChange={(e) => setPageSeq(e.target.value)} />
                    </label>
                );
            case 3:
                return (
                    <label>
                        Number of frames:
                        <input type="number" value={numFrames} onChange={(e) => setNumFrames(e.target.value)} />
                    </label>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>FIFO Page Replacement Algorithm</h2>
            <p>Explanation of FIFO Page Replacement Algorithm...</p>
            {renderInput()}
            <br />
            <button onClick={handleNext}>{step === 3 ? 'Start' : 'Next'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {output.frames && (
                <div>
                    <h3>Output:</h3>
                    <p>{output.frames.join('\n')}</p>
                    <p>Page Faults: {output.pageFaultStr}</p>
                    <p>Pages Success: {output.successCount}/{pageSeq.length} ({((output.successCount / pageSeq.length) * 100).toFixed(2)}%)</p>
                    <p>Pages Fault: {output.faultCount}/{pageSeq.length} ({((output.faultCount / pageSeq.length) * 100).toFixed(2)}%)</p>
                </div>
            )}
        </div>
    );
};

export default FIFOPageReplacement;
