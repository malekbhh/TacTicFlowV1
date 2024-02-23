import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await axiosClient.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets :", error);
    }
  };

  const handleAddProject = async () => {
    try {
      const response = await axiosClient.post("/projects", newProjectData);
      console.log("Projet ajouté avec succès :", response.data);

      // Recharger la liste des projets après l'ajout
      loadProjects();
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axiosClient.delete(`/projects/${projectId}`);
      console.log("Projet supprimé avec succès :", response.data);

      // Recharger la liste des projets après la suppression
      loadProjects();
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  const handleUpdateProject = async (projectId) => {
    const updatedProjectData = {
      title: "Nouveau Titre",
      description: "Nouvelle Description",
    };

    try {
      const response = await axiosClient.put(
        `/projects/${projectId}`,
        updatedProjectData
      );
      console.log("Projet mis à jour avec succès :", response.data);

      // Recharger la liste des projets après la mise à jour
      loadProjects();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du projet :", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Liste des Projets</h2>
      <ul className="list-disc pl-4">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id} className="mb-2">
              <span className="text-lg font-semibold">{project.title}</span> -{" "}
              {project.description}
              <div className="mt-2">
                <button
                  onClick={() => handleUpdateProject(project.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded"
                >
                  Mettre à Jour
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>Aucun projet trouvé</li>
        )}
      </ul>

      <h2 className="text-2xl font-bold my-4">Ajouter un Projet</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Titre:
        </label>
        <input
          type="text"
          value={newProjectData.title}
          onChange={(e) =>
            setNewProjectData({ ...newProjectData, title: e.target.value })
          }
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <input
          type="text"
          value={newProjectData.description}
          onChange={(e) =>
            setNewProjectData({
              ...newProjectData,
              description: e.target.value,
            })
          }
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <button
        onClick={handleAddProject}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Ajouter le Projet
      </button>
    </div>
  );
};

export default Projects;
