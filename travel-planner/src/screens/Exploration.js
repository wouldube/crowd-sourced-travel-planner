import Experience from '../components/Experience.js';
import ExperienceList from '../components/ExperienceList.js';
import AddExperience from '../components/AddExperience.js';

const Exploration = () => {
    return (
        <div className="exploration">
            <h2>Travel-Planner</h2>
            <Experience></Experience>
            <AddExperience></AddExperience>
        </div>
        <div className="experienceListBody">
            <ExperienceList></ExperienceList>
        </div>
    )
}

export default Exploration