<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActionRequest;
use Illuminate\Http\Request;
use Illuminate\Notifications\Action;
use Illuminate\Support\Facades\DB;

class Actioncontroller extends Controller
{
    public function indexAction()
    {
        $marches = DB::table('action')->get();

        return response()->json([
            'results' => $marches
        ], 200);
    }

    public function storeAction(ActionRequest $request)
    {
        try {
            $date = now();

            // Ajout de l'action dans la table action
            DB::table('action')->insert([
                'ref' => $request->ref,
                'num_emp' => $request->num_emp,
                'action' => $request->action,
                'motif' => $request->motif,
                'montant' => $request->montant,
                'date' => $date,
            ]);

            // Vérification du montant par rapport au salaire de base
            $employe = DB::table('employe')->where('num_emp', $request->num_emp)->first();
            if ($employe) {
                if ($request->montant > $employe->salaire_base) {
                    return response()->json([
                        'message' => "Erreur de montant : Le montant est supérieur au salaire de base de l'employé."
                    ], 400);
                }

                // Mise à jour du salaire_fin dans la table employe en fonction du type d'action
                if ($request->action === 'Sanction' || $request->action === 'Avance') {
                    $newSalaireFin = $employe->salaire_fin - $request->montant;
                } elseif ($request->action === 'Prime') {
                    $newSalaireFin = $employe->salaire_fin + $request->montant;
                }

                // Mise à jour du salaire_fin
                DB::table('employe')
                    ->where('num_emp', $request->num_emp)
                    ->update(['salaire_fin' => $newSalaireFin]);

                return response()->json([
                    'message' => "Action ajoutée avec succès. Salaire_fin mis à jour."
                ], 200);
            } else {
                return response()->json([
                    'message' => "Erreur : Employé non trouvé."
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de l'ajout de l'action : " . $e->getMessage()
            ], 500);
        }
    }


    public function modifierAction(ActionRequest $request, $ref)
    {
        try {
            $ref = intval($ref);
            $action = DB::table('action')->where('ref', $ref)->first();

            if (!$action) {
                return response()->json([
                    'message' => 'L\'action avec le numéro ' . $ref . ' n\'existe pas.'
                ], 404);
            }

            // Enregistrement des données d'origine de l'action
            $ancienMontant = $action->montant;
            $ancienneAction = $action->action;

            // Mise à jour de l'action avec les nouvelles valeurs
            DB::table('action')->where('ref', $ref)->update([
                'ref' => $request->ref,
                'num_emp' => $request->num_emp,
                'action' => $request->action,
                'motif' => $request->motif,
                'montant' => $request->montant,
            ]);

            // Récupération des données de l'employé
            $employe = DB::table('employe')->where('num_emp', $request->num_emp)->first();
            if (!$employe) {
                return response()->json([
                    'message' => 'Employé non trouvé.'
                ], 404);
            }

            // Calcul des modifications du salaire_fin en fonction de l'action
            $nouveauSalaireFin = $employe->salaire_fin;

            if ($ancienneAction === 'Sanction' || $ancienneAction === 'Avance') {
                $nouveauSalaireFin += $ancienMontant; // Annulation de l'action précédente
            } elseif ($ancienneAction === 'Prime') {
                $nouveauSalaireFin -= $ancienMontant; // Annulation de l'action précédente
            }

            if ($request->action === 'Sanction' || $request->action === 'Avance') {
                $nouveauSalaireFin -= $request->montant; // Application de la nouvelle action
            } elseif ($request->action === 'Prime') {
                $nouveauSalaireFin += $request->montant; // Application de la nouvelle action
            }

            // Mise à jour du salaire_fin de l'employé
            DB::table('employe')->where('num_emp', $request->num_emp)->update(['salaire_fin' => $nouveauSalaireFin]);

            return response()->json([
                'message' => 'Action modifiée avec succès. Salaire_fin mis à jour.'
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {

            $errors = $e->validator->errors()->toArray();

            return response()->json([
                'errors' => $errors,
                'message' => "Erreur lors de la validation des données."
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de l'ajout de l'employé : " . $e->getMessage()
            ], 500);
        }
    }



    public function supprimerAction($ref)
    {
        try {
            $ref = intval($ref);
            $action = DB::table('action')->where('ref', $ref)->first();

            if (!$action) {
                return response()->json([
                    'message' => 'L\'action avec le numéro ' . $ref . ' n\'existe pas.'
                ], 404);
            }

            // Récupérez les informations de l'action
            $num_emp = $action->num_emp;
            $montant = $action->montant;
            $actionType = $action->action;

            // Récupérez les informations de l'employé
            $employe = DB::table('employe')->where('num_emp', $num_emp)->first();
            if (!$employe) {
                return response()->json([
                    'message' => 'Employé non trouvé.'
                ], 404);
            }

            // Annulez l'effet de l'action sur le salaire_fin de l'employé
            $nouveauSalaireFin = $employe->salaire_fin;

            if ($actionType === 'Sanction' || $actionType === 'Avance') {
                $nouveauSalaireFin += $montant; // Annulation de l'action
            } elseif ($actionType === 'Prime') {
                $nouveauSalaireFin -= $montant; // Annulation de l'action
            }

            // Mise à jour du salaire_fin de l'employé
            DB::table('employe')->where('num_emp', $num_emp)->update(['salaire_fin' => $nouveauSalaireFin]);

            // Supprimez l'action de la base de données
            DB::table('action')->where('ref', $ref)->delete();

            return response()->json([
                'message' => "Action supprimée avec succès. Salaire_fin mis à jour."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de la suppression de l'action : " . $e->getMessage()
            ], 500);
        }
    }


    public function showAction($num_emp)
    {
        $num_emp = intval($num_emp);

        $actions = DB::table('action')->where('num_emp', $num_emp)->get();

        if ($actions->isEmpty()) {
            return response()->json([
                'code' => 404,
                'message' => 'Aucune action trouvée pour l\'employé avec le numéro ' . $num_emp
            ], 404);
        }

        return response()->json([
            'actions' => $actions
        ], 200);
    }


    public function showRef($ref)
    {
        $ref = intval($ref);

        $action = DB::table('action')->where('ref', $ref)->get()->first();

        if (!$action) {
            return response()->json([
                'code' => 404,
                'message' => 'Laction public avec le numéro ' . $ref . ' n\'existe pas.'

            ], 404);
        }

        return response()->json([
            'action' => $action
        ], 200);
    }
}
