import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProjects = async () => {
    try {
      const response = await axiosClient.get("/projects", {
        headers: {
          "X-CSRF-TOKEN": axiosClient.defaults.headers.common["X-CSRF-TOKEN"],
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets :", error);
    }
  };

  const validateProjectData = (data) => {
    const errors = {};

    if (!data.title) {
      errors.title = "Le titre est obligatoire";
    }

    if (!data.description) {
      errors.description = "La description est obligatoire";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateProjectData(newProjectData);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosClient.post("/projects", newProjectData, {
        withCredentials: true,
      });
      console.log("Projet ajouté avec succès :", response.data);
      loadProjects();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error("Internal server error:", error.response.data);
      } else {
        console.error("Error adding project:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const csrfToken = document.cookie.match(/XSRF-TOKEN=(.+);/)[1];
    axiosClient.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    loadProjects();
  }, []);
  const deleteProject = async (projectId) => {
    try {
      await axiosClient.delete(`/projects/${projectId}`, {
        withCredentials: true,
      });
      console.log(`Projet avec l'ID ${projectId} supprimé avec succès`);
      loadProjects();
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du projet : ${error.message}`
      );
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
                  onClick={() => deleteProject(project.id)}
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Titre:
          </label>
          <input
            type="text"
            name="title"
            value={newProjectData.title}
            onChange={(e) =>
              setNewProjectData({
                ...newProjectData,
                title: e.target.value,
              })
            }
            className="mt-1 p-2 border rounded-md w-full"
            error={errors.title}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            value={newProjectData.description}
            onChange={(e) =>
              setNewProjectData({
                ...newProjectData,
                description: e.target.value,
              })
            }
            className="mt-1 p-2 border rounded-md w-full"
            error={errors.description}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? "En cours..." : "Ajouter le Projet"}
        </button>
      </form>
    </div>
  );
};

export default Projects;
