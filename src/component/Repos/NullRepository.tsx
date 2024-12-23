import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const NullRepository: React.FC = () => {
  const boxes = [{ title: "Box 1" }, { title: "Box 2" }, { title: "Box 3" }];
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

  const [isOpen, setIsOpen] = useState([false, false, false]);

  const toggleBox = (index: number) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  return (
    <div className="nullrepo">
      <div className="nullrepo-left">
        {boxes.map((box, index) => (
          <div className={`box ${isOpen[index] ? "open" : ""}`} key={index}>
            <div className="box-header" onClick={() => toggleBox(index)}>
              <div className="box-title">
                <span>{box.title}</span>
              </div>
              <span className="expand-icon">
                {isOpen[index] ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )}
              </span>
            </div>
            {isOpen[index] && (
              <div className="box-content">
                This is the content of {box.title}.
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="nullrepo-right">
        <div className="step-diagram">
          <div className="step-container">
            {steps.map((label, index) => (
              <React.Fragment key={index}>
                <div className="step">
                  <div className="circle"></div>
                  <span className="step-label">{label}</span>
                </div>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <hr />
        <div className="right-content-header">
          <div className="right-content-title">Right Content Title</div>
          <div className="right-content-delete-icon">
            <IoClose />
          </div>
        </div>

        {/* Styled paragraphs and divs */}
        <div className="content-section">
          <p className="content-title">Whit's this</p>
          <div className="content-description">
            Semaphore is all about collaboration. Invite your team members so
            they can access your organization's projects, monitor builds, and
            manage deployments—all while maintaining the same access permissions
            they have in xxx.
          </div>
        </div>

        <div className="content-section">
          <p className="content-title">How can I complete this</p>
          <div className="content-description">
            <p> Semaphore is all about collaboration.</p>
            <p> Semaphore is all about collaboration.</p>
            <ul>
              <li>Step 1</li>
              <li>Step 2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NullRepository;
