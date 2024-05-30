<?php

use App\Http\Controllers\Actioncontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\paymentcontroller;
use App\Http\Controllers\recucontroller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

Route::get('liste', [paymentcontroller::class, 'index']);
Route::get('liste/{num_emp}', [paymentcontroller::class, 'show']);
Route::post('/ajouter', [paymentcontroller::class, 'storeEmp']);
Route::put('/modifier/{num_emp}', [paymentcontroller::class, 'modifier']);
Route::delete('/supprimer/{num_emp}', [paymentcontroller::class, 'supprimer']);


Route::get('listeAction', [Actioncontroller::class, 'indexAction']);
Route::get('listeAction/{num_emp}', [Actioncontroller::class, 'showAction']);
Route::get('listeRef/{ref}', [Actioncontroller::class, 'showRef']);
Route::post('/ajouterAction', [Actioncontroller::class, 'storeAction']);
Route::put('/modifierAction/{ref}', [Actioncontroller::class, 'modifierAction']);
Route::delete('/supprimerAction/{ref}', [Actioncontroller::class, 'supprimerAction']);

Route::get('listePayment', [recucontroller::class, 'indexPayment']);
Route::post('/ajouterPayment', [recucontroller::class, 'storePayment']);
Route::get('listePayment/{num_payment}', [recucontroller::class, 'showPayment']);
