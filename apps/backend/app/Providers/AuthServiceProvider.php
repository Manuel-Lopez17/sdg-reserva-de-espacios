<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('admin-access', function ($user) {
            \Log::info('Gate admin-access evaluado para user id ' . $user->id . ', role: ' . $user->role);
            return $user->role === 'admin';
        });
    }
}
