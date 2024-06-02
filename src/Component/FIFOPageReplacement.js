import React, { useState } from 'react';

class Frame {
    constructor(frameName) {
        this.frameName = frameName;
        this.frameSeq = [];
    }

    getName() {
        return this.frameName;
    }

    insertPage(page) {
        this.frameSeq.push(page);
    }

    displayFrame() {
        let temp = `${this.frameName}   `;
        for (let frame of this.frameSeq) {
            temp += `${frame} `;
        }
        console.log(temp);
    }

    peek() {
        return this.frameSeq[this.frameSeq.length - 1];
    }

    isEmpty() {
        return this.frameSeq.length === 0;
    }
}

class Fifo {
    constructor(pageSeq, pageList, frames) {
        this.faultCount = 0;
        this.successCount = 0;
        this.pageSeq = [...pageSeq];
        this.pageList = [...pageList];
        this.frames = [...frames];
        this.isLeft = true;
        this.pageFault = "PF   ";
    }

    startAlgo() {
        const frame1 = this.frames[0];
        const frame2 = this.frames[1];

        for (let i = 0; i < this.pageSeq.length; i++) {
            const currPage = this.pageSeq[i];

            if (frame1.isEmpty()) {
                frame1.insertPage(currPage);
                frame2.insertPage(" ");
                this.isLeft = false;
                this.faultCount++;
                this.pageFault += "* ";
            } else if (frame2.peek() === " ") {
                frame1.insertPage(frame1.peek());
                frame2.insertPage(currPage);
                this.isLeft = true;
                this.faultCount++;
                this.pageFault += "* ";
            } else if (!frame1.isEmpty() && !frame2.isEmpty()) {
                if (currPage === frame1.peek() || currPage === frame2.peek()) {
                    if (currPage === frame1.peek()) {
                        frame1.insertPage(currPage);
                        frame2.insertPage(frame2.peek());
                    } else {
                        frame1.insertPage(frame1.peek());
                        frame2.insertPage(currPage);
                    }
                    this.successCount++;
                    this.pageFault += "  ";
                } else {
                    if (currPage !== frame1.peek() && this.isLeft) {
                        frame1.insertPage(currPage);
                        frame2.insertPage(frame2.peek());
                        this.isLeft = false;
                    } else {
                        frame1.insertPage(frame1.peek());
                        frame2.insertPage(currPage);
                        this.isLeft = true;
                    }
                    this.faultCount++;
                    this.pageFault += "* ";
                }
            }
        }
    }

    displayOutput() {
        console.log("\nFIFO Output:\n");
        let headers = "";
        for (let pageHeader of this.pageSeq) {
            headers += `${pageHeader} `;
        }
        console.log(`     ${headers}`);

        for (let frame of this.frames) {
            frame.displayFrame();
        }

        console.log(this.pageFault);

        const ps = parseFloat((this.successCount / this.pageSeq.length).toFixed(2));
        const pf = parseFloat((this.faultCount / this.pageSeq.length).toFixed(2));

        const pageSuccess = `\nPages Success \n\t= ${this.successCount}/${this.pageSeq.length}\n\t= ${ps}\n\t= ${(ps * 100).toFixed()}%`;
        const pageFault = `\nPages Fault \n\t= ${this.faultCount}/${this.pageSeq.length}\n\t= ${pf}\n\t= ${(pf * 100).toFixed()}%`;

        console.log(pageSuccess + "\n" + pageFault);
    }
}

const FIFOPageReplacement = () => {
    const [pages, setPages] = useState(0);
    const [frames, setFrames] = useState(0);
    const [pageList, setPageList] = useState([]);
    const [pageSeq, setPageSeq] = useState([]);
    const [output, setOutput] = useState('');

    const runAlgorithm = () => {
        // Convert pageList and pageSeq to arrays of strings
        const pageListArray = pageList.split(' ');
        const pageSeqArray = pageSeq.split(', ');

        // Initialize frames
        const frameList = [];
        for (let i = 0; i < frames; i++) {
            frameList.push(new Frame(`F${i + 1}`));
        }

        // FIFO algorithm logic
        const fifo = new Fifo(pageSeqArray, pageListArray, frameList);
        fifo.startAlgo();
        const outputText = fifo.displayOutput();
        setOutput(outputText);
    };

    return (
        <div>
            <h2>FIFO Page Replacement Algorithm</h2>
            <p>Explanation of FIFO Page Replacement Algorithm...</p>
            <label>
                How many pages? 
                <input type="number" value={pages} onChange={(e) => setPages(parseInt(e.target.value))} />
            </label>
            <br />
            <label>
                List of the {pages} pages? 
                <input type="text" value={pageList} onChange={(e) => setPageList(e.target.value)} />
            </label>
            <br />
            <label>
                Enter the page sequence: 
                <input type="text" value={pageSeq} onChange={(e) => setPageSeq(e.target.value)} />
            </label>
            <br />
            <label>
                How many frames? 
                <input type="number" value={frames} onChange={(e) => setFrames(parseInt(e.target.value))} />
            </label>
            <br />
            <button onClick={runAlgorithm}>Run Algorithm</button>
            <br />
            <div>
                <h3>Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default FIFOPageReplacement;
