
type TabProps = {
    tabName: string,
    isActive: boolean,
    setActiveTab: (name: string) => void
}

function Tab({tabName, isActive, setActiveTab}:TabProps):JSX.Element {
  const onClickTabHandler = (tab: string) => {
    setActiveTab(tab);
  };

  return(
    <li className={`film-nav__item ${isActive ? 'film-nav__item--active' : ''}`}>
      <a href="/" className="film-nav__link" onClick={(e)=>{e.preventDefault(); onClickTabHandler(tabName);}}>{tabName}</a>
    </li>
  );
}

export default Tab;
