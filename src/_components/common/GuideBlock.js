import Link from "next/link";

const GuideBlock=()=>{
    return(
        <div className="links-lft">
         <ul className="border-list">
              <li>
                <Link href="#" className="d-flex justify-content-between">
                  <span>Engagement ring guide</span>
                  <span className="material-icons-outlined">
                    chevron_right
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="d-flex justify-content-between">
                  <span>Dimond Guide</span>
                  <span className="material-icons-outlined">
                    chevron_right
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="d-flex justify-content-between">
                  <span>Ring Size Guide</span>
                  <span className="material-icons-outlined">
                    chevron_right
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="d-flex justify-content-between">
                  <span>Metal guide</span>
                  <span className="material-icons-outlined">
                    chevron_right
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#" className="d-flex justify-content-between">
                  <span>Our Story</span>
                  <span className="material-icons-outlined">
                    chevron_right
                  </span>
                </Link>
              </li>
            </ul>
        </div>
    )
}

export default GuideBlock;